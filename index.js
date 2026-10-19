let currentPublicUrl = process.env.RENDER_EXTERNAL_URL || process.env.PUBLIC_URL || null;

export function setPublicUrl(url) {
  currentPublicUrl = url;
}

export function startServer() {
  const server = app.listen(PORT, '0.0.0.0', () => {
    console.log(`====================================================`);
    console.log(`🇳🇬 NaijaWatt Energy Transition Platform is Running!`);
    console.log(`Local Access: http://localhost:${PORT}`);
    console.log(`Network Access: http://0.0.0.0:${PORT}`);
    console.log(`====================================================`);
  });

  return server;
}

app.get('/api/states', (req, res) => {
  res.json({
    success: true,
    totalStates: Object.keys(NIGERIA_STATES_DATA).length,
    data: NIGERIA_STATES_DATA
  });
});

app.get('/api/states/:stateName', (req, res) => {
  const stateKey = Object.keys(NIGERIA_STATES_DATA).find(
    s => s.toLowerCase() === req.params.stateName.toLowerCase()
  );

  if (!stateKey) {
    return res.status(404).json({ success: false, error: 'State not found in Nigerian registry' });
  }

  res.json({ success: true, data: NIGERIA_STATES_DATA[stateKey] });
});

app.get('/api/benchmarks', (req, res) => {
  res.json({
    success: true,
    benchmarks: RENEWABLE_COST_BENCHMARKS,
    profiles: FACILITY_PROFILES
  });
});

app.post('/api/calculate', (req, res) => {
  try {
    const {
      stateName = 'Lagos',
      facilityType = 'shop',
      facilitySizeId = 'shop_medium',
      fuelType = 'petrol',
      customFuelPrice,
      customConsumptionLitersPerHour,
      customDailyHours,
      customLoadKW
    } = req.body ?? {};

    const normalizedState = typeof stateName === 'string' ? stateName : 'Lagos';
    const normalizedFacilityType = typeof facilityType === 'string' ? facilityType : 'shop';
    const normalizedSizeId = typeof facilitySizeId === 'string' ? facilitySizeId : 'shop_medium';
    const normalizedFuelType = typeof fuelType === 'string' ? fuelType : 'petrol';

    const stateData = NIGERIA_STATES_DATA[normalizedState] || NIGERIA_STATES_DATA['Lagos'];
    const facility = FACILITY_PROFILES.find(f => f.id === normalizedFacilityType) || FACILITY_PROFILES[0];
    const sizeConfig = facility.sizes.find(s => s.sizeId === normalizedSizeId) || facility.sizes[0];

    const actualFuelPrice = customFuelPrice !== undefined
      ? Number(customFuelPrice)
      : stateData.fuelPrices[normalizedFuelType] || 890;

    const actualConsumption = customConsumptionLitersPerHour !== undefined
      ? Number(customConsumptionLitersPerHour)
      : sizeConfig.defaultFuelLitersPerHour;

    const actualHours = customDailyHours !== undefined
      ? Number(customDailyHours)
      : sizeConfig.typicalDailyHours;

    const actualAvgLoad = customLoadKW !== undefined
      ? Number(customLoadKW)
      : sizeConfig.avgLoadKW;

    const actualPeakLoad = sizeConfig.peakLoadKW || actualAvgLoad * 1.4;

    if (!Number.isFinite(actualFuelPrice) || actualFuelPrice <= 0 || !Number.isFinite(actualConsumption) || actualConsumption <= 0 || !Number.isFinite(actualHours) || actualHours <= 0 || !Number.isFinite(actualAvgLoad) || actualAvgLoad <= 0) {
      return res.status(400).json({ success: false, error: 'Invalid calculation inputs' });
    }

    const genMetrics = CalculationEngine.calculateGeneratorMetrics({
      fuelType: normalizedFuelType,
      fuelPricePerLiter: actualFuelPrice,
      fuelConsumptionLitersPerHour: actualConsumption,
      dailyRuntimeHours: actualHours,
      avgLoadKW: actualAvgLoad
    });

    const dailyKwhNeeded = actualAvgLoad * actualHours;

    const renewableMetrics = CalculationEngine.calculateRenewableReplacement({
      dailyKwhNeeded,
      peakLoadKW: actualPeakLoad,
      avgLoadKW: actualAvgLoad,
      daytimeRatio: sizeConfig.daytimeRatio || 0.65,
      stateData
    });

    const financialROI = CalculationEngine.calculateFinancialROI(
      genMetrics,
      renewableMetrics.solar.costs.totalCapex
    );

    res.json({
      success: true,
      state: stateData,
      facility,
      sizeConfig,
      generator: genMetrics,
      renewable: renewableMetrics,
      financial: financialROI
    });
  } catch (err) {
    console.error('Calculation error:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

app.get('/api/public-status', (req, res) => {
  res.json({
    status: 'online',
    port: PORT,
    publicUrl: currentPublicUrl || null,
    uptimeSeconds: Math.round(process.uptime()),
    timestamp: new Date().toISOString()
  });
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

const isDirectRun = process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href;
if (isDirectRun) {
  startServer();
}

export default app;
