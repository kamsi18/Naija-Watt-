import { NIGERIA_STATES_DATA, FACILITY_PROFILES } from '../data/nigeriaData.js';
import { CalculationEngine } from './calculationEngine.js';
import { appState, DOM, safeNumber } from './appState.js';
import {
  fuelButtonClasses,
  facilityTabClasses,
  facilitySizeClasses,
  stateCardClasses,
  currencyBadge
} from './uiHelpers.js';

document.addEventListener('DOMContentLoaded', () => {
  cacheDOMElements();
  initHeaderStates();
  initFacilityTabs();
  initEventListeners();
  initStatesDirectory();
  fetchPublicStatus();
  updateAllCalculations();

  // Initialize Lucide icons
  if (window.lucide) {
    window.lucide.createIcons();
  }
});

function cacheDOMElements() {
  DOM.headerStateSelect = document.getElementById('headerStateSelect');
  DOM.heroStateBadge = document.getElementById('heroStateBadge');
  DOM.heroPetrolPrice = document.getElementById('heroPetrolPrice');
  DOM.heroDieselPrice = document.getElementById('heroDieselPrice');
  DOM.heroGridTariff = document.getElementById('heroGridTariff');
  DOM.heroSolarInsolation = document.getElementById('heroSolarInsolation');

  // Generator Controls
  DOM.fuelPetrolBtn = document.getElementById('fuelPetrolBtn');
  DOM.fuelDieselBtn = document.getElementById('fuelDieselBtn');
  DOM.genPresetSelect = document.getElementById('genPresetSelect');
  DOM.fuelPriceInput = document.getElementById('fuelPriceInput');
  DOM.fuelPriceStateBadge = document.getElementById('fuelPriceStateBadge');
  DOM.fuelConsumptionSlider = document.getElementById('fuelConsumptionSlider');
  DOM.fuelConsumptionVal = document.getElementById('fuelConsumptionVal');
  DOM.dailyRuntimeSlider = document.getElementById('dailyRuntimeSlider');
  DOM.dailyRuntimeVal = document.getElementById('dailyRuntimeVal');
  DOM.avgLoadSlider = document.getElementById('avgLoadSlider');
  DOM.avgLoadVal = document.getElementById('avgLoadVal');
  DOM.resetGenDefaultsBtn = document.getElementById('resetGenDefaultsBtn');

  // Generator Output Cards
  DOM.cardHourlyCost = document.getElementById('cardHourlyCost');
  DOM.cardHourlyBreakdown = document.getElementById('cardHourlyBreakdown');
  DOM.cardMonthlyCost = document.getElementById('cardMonthlyCost');
  DOM.cardMonthlyFuelLiters = document.getElementById('cardMonthlyFuelLiters');
  DOM.cardAnnualCost = document.getElementById('cardAnnualCost');
  DOM.cardAnnualFuelLiters = document.getElementById('cardAnnualFuelLiters');
  DOM.cardEffectiveKwhRate = document.getElementById('cardEffectiveKwhRate');
  DOM.cardDiscoTariff = document.getElementById('cardDiscoTariff');
  DOM.cardAnnualCo2 = document.getElementById('cardAnnualCo2');
  DOM.cardTenYearSpend = document.getElementById('cardTenYearSpend');

  // Facility Elements
  DOM.facilityCategoryGrid = document.getElementById('facilityCategoryGrid');
  DOM.activeFacilityName = document.getElementById('activeFacilityName');
  DOM.activeFacilityDesc = document.getElementById('activeFacilityDesc');
  DOM.facilitySizesContainer = document.getElementById('facilitySizesContainer');
  DOM.facPeakLoad = document.getElementById('facPeakLoad');
  DOM.facAvgLoad = document.getElementById('facAvgLoad');
  DOM.facGenSuggestion = document.getElementById('facGenSuggestion');
  DOM.facDailyKwh = document.getElementById('facDailyKwh');
  DOM.facHours = document.getElementById('facHours');
  DOM.facDayRatio = document.getElementById('facDayRatio');
  DOM.facAppliancesList = document.getElementById('facAppliancesList');
  DOM.applyFacilityToTrackerBtn = document.getElementById('applyFacilityToTrackerBtn');

  // Renewable Sizer Elements
  DOM.renewStateName = document.getElementById('renewStateName');
  DOM.recommendStateZone = document.getElementById('recommendStateZone');
  DOM.recommendedMixTitle = document.getElementById('recommendedMixTitle');
  DOM.recommendedMixDesc = document.getElementById('recommendedMixDesc');
  DOM.recommendedCapex = document.getElementById('recommendedCapex');
  DOM.recommendedPayback = document.getElementById('recommendedPayback');

  DOM.solarSpecCapacity = document.getElementById('solarSpecCapacity');
  DOM.solarSpecPanels = document.getElementById('solarSpecPanels');
  DOM.solarSpecBattery = document.getElementById('solarSpecBattery');
  DOM.solarSpecInverter = document.getElementById('solarSpecInverter');
  DOM.solarSpecInsolation = document.getElementById('solarSpecInsolation');
  DOM.solarTotalCapex = document.getElementById('solarTotalCapex');

  DOM.windViabilityBadge = document.getElementById('windViabilityBadge');
  DOM.windSpecSpeed = document.getElementById('windSpecSpeed');
  DOM.windSpecCapacity = document.getElementById('windSpecCapacity');
  DOM.windSpecUnits = document.getElementById('windSpecUnits');
  DOM.windExplanationText = document.getElementById('windExplanationText');
  DOM.windTotalCapex = document.getElementById('windTotalCapex');

  DOM.hydroViabilityBadge = document.getElementById('hydroViabilityBadge');
  DOM.hydroSpecRating = document.getElementById('hydroSpecRating');
  DOM.hydroSpecCapacity = document.getElementById('hydroSpecCapacity');
  DOM.hydroSpecBatterySaving = document.getElementById('hydroSpecBatterySaving');
  DOM.hydroExplanationText = document.getElementById('hydroExplanationText');
  DOM.hydroTotalCapex = document.getElementById('hydroTotalCapex');

  // State Directory
  DOM.statesCardsGrid = document.getElementById('statesCardsGrid');
  DOM.stateSearchInput = document.getElementById('stateSearchInput');
  DOM.zoneFilterSelect = document.getElementById('zoneFilterSelect');

  // ROI Section
  DOM.itemizedCostList = document.getElementById('itemizedCostList');
  DOM.roiPaybackYears = document.getElementById('roiPaybackYears');
  DOM.roiPaybackMonths = document.getElementById('roiPaybackMonths');
  DOM.roiMonthlySavings = document.getElementById('roiMonthlySavings');
  DOM.roiTenYearNet = document.getElementById('roiTenYearNet');
  DOM.roiPercentBadge = document.getElementById('roiPercentBadge');
  DOM.lcoeGenVal = document.getElementById('lcoeGenVal');
  DOM.lcoeRenewVal = document.getElementById('lcoeRenewVal');
  DOM.lcoeRenewBar = document.getElementById('lcoeRenewBar');
  DOM.lcoeSavingsTimes = document.getElementById('lcoeSavingsTimes');

  // Audit Report
  DOM.reportDate = document.getElementById('reportDate');
  DOM.reportState = document.getElementById('reportState');
  DOM.reportRefId = document.getElementById('reportRefId');
  DOM.reportMonthlySpend = document.getElementById('reportMonthlySpend');
  DOM.reportAnnualSpend = document.getElementById('reportAnnualSpend');
  DOM.reportAnnualLiters = document.getElementById('reportAnnualLiters');
  DOM.reportSystemCapacity = document.getElementById('reportSystemCapacity');
  DOM.reportPanelsSummary = document.getElementById('reportPanelsSummary');
  DOM.reportTotalCapex = document.getElementById('reportTotalCapex');
  DOM.reportPaybackSummary = document.getElementById('reportPaybackSummary');
  DOM.reportTenYearSavings = document.getElementById('reportTenYearSavings');
  DOM.reportCo2Avoided = document.getElementById('reportCo2Avoided');
  DOM.reportBomTableBody = document.getElementById('reportBomTableBody');
  DOM.downloadAuditJsonBtn = document.getElementById('downloadAuditJsonBtn');

  // Public Share Modal
  DOM.openShareModalBtn = document.getElementById('openShareModalBtn');
  DOM.footerShareBtn = document.getElementById('footerShareBtn');
  DOM.closeShareModalBtn = document.getElementById('closeShareModalBtn');
  DOM.closeShareModalBtn2 = document.getElementById('closeShareModalBtn2');
  DOM.shareModal = document.getElementById('shareModal');
  DOM.publicUrlInput = document.getElementById('publicUrlInput');
  DOM.copyPublicUrlBtn = document.getElementById('copyPublicUrlBtn');
  DOM.copyBtnText = document.getElementById('copyBtnText');
}

/**
 * Initialize Header State Dropdown with all 36 States + FCT
 */
function initHeaderStates() {
  const stateKeys = Object.keys(NIGERIA_STATES_DATA).sort();
  DOM.headerStateSelect.innerHTML = stateKeys
    .map(key => `<option value="${key}" ${key === appState.activeState ? 'selected' : ''}>${key}</option>`)
    .join('');

  DOM.headerStateSelect.addEventListener('change', (e) => {
    switchActiveState(e.target.value);
  });
}

/**
 * Switch Active State and update all cascading prices
 */
function switchActiveState(stateName) {
  if (!NIGERIA_STATES_DATA[stateName]) return;
  appState.activeState = stateName;
  DOM.headerStateSelect.value = stateName;

  const stateData = NIGERIA_STATES_DATA[stateName];
  appState.fuelPrice = stateData.fuelPrices[appState.fuelType];
  DOM.fuelPriceInput.value = appState.fuelPrice;
  DOM.fuelPriceStateBadge.textContent = `State: ${stateName}`;

  updateAllCalculations();
  highlightActiveStateCard();
}

/**
 * Initialize Facility Profile Selection & Load Defaults
 */
function initFacilityTabs() {
  // Render Category Cards
  DOM.facilityCategoryGrid.innerHTML = FACILITY_PROFILES.map(fac => {
    const isActive = fac.id === appState.activeFacilityId;
    const iconClass = isActive ? 'bg-emerald-500 text-white' : 'bg-slate-800 text-emerald-400';
    const labelClass = isActive ? 'text-emerald-400' : 'text-slate-200';

    return `
      <button type="button" data-fac-id="${fac.id}" class="${facilityTabClasses(isActive)}">
        <div class="flex items-center space-x-2.5">
          <div class="w-8 h-8 rounded-lg ${iconClass} flex items-center justify-center font-bold text-xs">
            <i data-lucide="${fac.icon}" class="w-4 h-4"></i>
          </div>
          <div>
            <span class="text-xs font-bold ${labelClass} block">${fac.name}</span>
            <span class="text-[10px] text-slate-400 block">${fac.sizes.length} Size tiers</span>
          </div>
        </div>
      </button>
    `;
  }).join('');

  // Add click listeners to category cards
  document.querySelectorAll('.facility-tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const facId = btn.getAttribute('data-fac-id');
      selectFacilityCategory(facId);
    });
  });

  renderFacilitySizes();
}

function selectFacilityCategory(facId) {
  appState.activeFacilityId = facId;
  const facility = FACILITY_PROFILES.find(f => f.id === facId);
  appState.activeSizeId = facility.sizes[0].sizeId;

  // Update tabs style
  document.querySelectorAll('.facility-tab-btn').forEach(btn => {
    const isThis = btn.getAttribute('data-fac-id') === facId;
    btn.classList.toggle('border-emerald-500', isThis);
    btn.classList.toggle('bg-emerald-500/10', isThis);
    btn.classList.toggle('border-slate-800', !isThis);
    const title = btn.querySelector('span');
    if (title) {
      title.classList.toggle('text-emerald-400', isThis);
      title.classList.toggle('text-slate-200', !isThis);
    }
  });

  renderFacilitySizes();
  updateFacilityDetails();
}

function renderFacilitySizes() {
  const facility = FACILITY_PROFILES.find(f => f.id === appState.activeFacilityId);
  if (!facility) return;

  DOM.activeFacilityName.textContent = facility.name;
  DOM.activeFacilityDesc.textContent = facility.description;

  DOM.facilitySizesContainer.innerHTML = facility.sizes
    .map(size => {
      const isActive = size.sizeId === appState.activeSizeId;
      return `
        <button type="button" data-size-id="${size.sizeId}" class="${facilitySizeClasses(isActive)}">
          ${size.sizeLabel}
        </button>
      `;
    })
    .join('');

  document.querySelectorAll('.facility-size-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      appState.activeSizeId = btn.getAttribute('data-size-id');
      renderFacilitySizes();
      updateFacilityDetails();
    });
  });

  updateFacilityDetails();
}

function updateFacilityDetails() {
  const facility = FACILITY_PROFILES.find(f => f.id === appState.activeFacilityId);
  if (!facility) return;
  const sizeConfig = facility.sizes.find(s => s.sizeId === appState.activeSizeId) || facility.sizes[0];

  DOM.facPeakLoad.textContent = `${sizeConfig.peakLoadKW.toFixed(1)} kW`;
  DOM.facAvgLoad.textContent = `${sizeConfig.avgLoadKW.toFixed(1)} kW`;
  DOM.facGenSuggestion.textContent = `${sizeConfig.suggestedGenKVA} kVA (${sizeConfig.defaultFuelType.toUpperCase()})`;
  
  const dailyKwh = (sizeConfig.avgLoadKW * sizeConfig.typicalDailyHours).toFixed(1);
  DOM.facDailyKwh.textContent = `${dailyKwh} kWh / day`;
  DOM.facHours.textContent = `${sizeConfig.typicalDailyHours} hrs / day`;
  DOM.facDayRatio.textContent = `${Math.round(sizeConfig.daytimeRatio * 100)}%`;
  DOM.facAppliancesList.textContent = sizeConfig.appliances;

  appState.peakLoadKW = sizeConfig.peakLoadKW;
  appState.avgLoadKW = sizeConfig.avgLoadKW;
}

/**
 * Apply selected Facility preset into the Generator Tracker controls
 */
function applyFacilityToTracker() {
  const facility = FACILITY_PROFILES.find(f => f.id === appState.activeFacilityId);
  const sizeConfig = facility.sizes.find(s => s.sizeId === appState.activeSizeId) || facility.sizes[0];

  // Set fuel type
  setFuelType(sizeConfig.defaultFuelType);

  // Set consumption
  appState.fuelConsumption = sizeConfig.defaultFuelLitersPerHour;
  DOM.fuelConsumptionSlider.value = sizeConfig.defaultFuelLitersPerHour;
  DOM.fuelConsumptionVal.textContent = `${sizeConfig.defaultFuelLitersPerHour} Liters / hr`;

  // Set runtime
  appState.dailyRuntime = sizeConfig.typicalDailyHours;
  DOM.dailyRuntimeSlider.value = sizeConfig.typicalDailyHours;
  DOM.dailyRuntimeVal.textContent = `${sizeConfig.typicalDailyHours} Hours / day`;

  // Set load
  appState.avgLoadKW = sizeConfig.avgLoadKW;
  DOM.avgLoadSlider.value = sizeConfig.avgLoadKW;
  DOM.avgLoadVal.textContent = `${sizeConfig.avgLoadKW} kW`;

  updateAllCalculations();

  // Scroll to tracker
  const trackerEl = document.getElementById('tracker');
  if (trackerEl) {
    trackerEl.scrollIntoView({ behavior: 'smooth' });
  }
}

/**
 * Switch Fuel Type (Petrol vs Diesel)
 */
function setFuelType(type) {
  appState.fuelType = type;
  const stateData = NIGERIA_STATES_DATA[appState.activeState];
  appState.fuelPrice = stateData.fuelPrices[type];
  DOM.fuelPriceInput.value = appState.fuelPrice;

  DOM.fuelPetrolBtn.className = fuelButtonClasses(type === 'petrol');
  DOM.fuelDieselBtn.className = fuelButtonClasses(type === 'diesel');
  updateAllCalculations();
}

/**
 * Generator Size Preset Selector Logic
 */
function handleGenPresetChange(val) {
  if (val === 'custom') return;
  const kva = parseFloat(val);
  let lph = 2.4;
  let load = 4.0;
  let fType = 'petrol';

  if (kva <= 3.5) {
    lph = 1.0; load = 1.6; fType = 'petrol';
  } else if (kva <= 8.5) {
    lph = 2.4; load = 4.2; fType = 'petrol';
  } else if (kva <= 15.0) {
    lph = 4.5; load = 8.5; fType = 'diesel';
  } else if (kva <= 35.0) {
    lph = 7.5; load = 18.0; fType = 'diesel';
  } else if (kva <= 65.0) {
    lph = 14.0; load = 36.0; fType = 'diesel';
  } else if (kva <= 100.0) {
    lph = 22.0; load = 60.0; fType = 'diesel';
  }

  setFuelType(fType);
  appState.fuelConsumption = lph;
  DOM.fuelConsumptionSlider.value = lph;
  DOM.fuelConsumptionVal.textContent = `${lph} Liters / hr`;

  appState.avgLoadKW = load;
  DOM.avgLoadSlider.value = load;
  DOM.avgLoadVal.textContent = `${load} kW`;

  updateAllCalculations();
}

/**
 * Register Event Listeners
 */
function initEventListeners() {
  DOM.fuelPetrolBtn.addEventListener('click', () => setFuelType('petrol'));
  DOM.fuelDieselBtn.addEventListener('click', () => setFuelType('diesel'));

  DOM.genPresetSelect.addEventListener('change', (e) => {
    handleGenPresetChange(e.target.value);
  });

  DOM.fuelPriceInput.addEventListener('input', (e) => {
    appState.fuelPrice = safeNumber(e.target.value, 850);
    updateAllCalculations();
  });

  DOM.fuelConsumptionSlider.addEventListener('input', (e) => {
    appState.fuelConsumption = safeNumber(e.target.value, 0);
    DOM.fuelConsumptionVal.textContent = `${appState.fuelConsumption.toFixed(1)} Liters / hr`;
    DOM.genPresetSelect.value = 'custom';
    updateAllCalculations();
  });

  DOM.dailyRuntimeSlider.addEventListener('input', (e) => {
    appState.dailyRuntime = safeNumber(e.target.value, 0);
    DOM.dailyRuntimeVal.textContent = `${appState.dailyRuntime} Hours / day`;
    updateAllCalculations();
  });

  DOM.avgLoadSlider.addEventListener('input', (e) => {
    appState.avgLoadKW = safeNumber(e.target.value, 0);
    DOM.avgLoadVal.textContent = `${appState.avgLoadKW.toFixed(1)} kW`;
    updateAllCalculations();
  });

  DOM.resetGenDefaultsBtn.addEventListener('click', () => {
    switchActiveState("Lagos");
    setFuelType("petrol");
    DOM.genPresetSelect.value = "7.5";
    handleGenPresetChange("7.5");
  });

  DOM.applyFacilityToTrackerBtn.addEventListener('click', applyFacilityToTracker);

  // State Search & Filter
  DOM.stateSearchInput.addEventListener('input', filterStatesCards);
  DOM.zoneFilterSelect.addEventListener('change', filterStatesCards);

  // Modal handlers
  DOM.openShareModalBtn.addEventListener('click', () => DOM.shareModal.classList.remove('hidden'));
  DOM.footerShareBtn.addEventListener('click', () => DOM.shareModal.classList.remove('hidden'));
  DOM.closeShareModalBtn.addEventListener('click', () => DOM.shareModal.classList.add('hidden'));
  DOM.closeShareModalBtn2.addEventListener('click', () => DOM.shareModal.classList.add('hidden'));

  DOM.copyPublicUrlBtn.addEventListener('click', copyPublicUrl);
  DOM.downloadAuditJsonBtn.addEventListener('click', exportAuditJson);
}

/**
 * Core Orchestrator: Recalculates all generator costs, renewables sizing, and financial ROI
 */
function updateAllCalculations() {
  const stateData = NIGERIA_STATES_DATA[appState.activeState];
  if (!stateData) return;

  // 1. Update Hero summary badges
  DOM.heroStateBadge.textContent = `${stateData.name} State`;
  DOM.heroPetrolPrice.textContent = `₦${stateData.fuelPrices.petrol} / L`;
  DOM.heroDieselPrice.textContent = `₦${stateData.fuelPrices.diesel} / L`;
  DOM.heroGridTariff.textContent = `₦${stateData.gridBandATariff} / kWh`;
  DOM.heroSolarInsolation.textContent = `${stateData.solarInsolation} PSH`;

  // 2. Generator Tracker Metrics
  const genMetrics = CalculationEngine.calculateGeneratorMetrics({
    fuelType: appState.fuelType,
    fuelPricePerLiter: appState.fuelPrice,
    fuelConsumptionLitersPerHour: appState.fuelConsumption,
    dailyRuntimeHours: appState.dailyRuntime,
    avgLoadKW: appState.avgLoadKW
  });

  // Render Generator Cards
  DOM.cardHourlyCost.textContent = CalculationEngine.formatNaira(genMetrics.totalHourlyCost);
  DOM.cardHourlyBreakdown.textContent = `${CalculationEngine.formatNaira(genMetrics.hourlyFuelCost)} fuel + ${CalculationEngine.formatNaira(genMetrics.hourlyMaintenanceCost)} lube`;
  
  DOM.cardMonthlyCost.textContent = CalculationEngine.formatNaira(genMetrics.monthlyCost);
  DOM.cardMonthlyFuelLiters.textContent = `${genMetrics.monthlyFuelLiters.toLocaleString()} Liters of Fuel`;

  DOM.cardAnnualCost.textContent = CalculationEngine.formatNaira(genMetrics.annualCost);
  DOM.cardAnnualFuelLiters.textContent = `${genMetrics.annualFuelLiters.toLocaleString()} Liters Burned`;

  DOM.cardEffectiveKwhRate.textContent = `${CalculationEngine.formatNaira(genMetrics.costPerKwh)} / kWh`;
  DOM.cardDiscoTariff.textContent = `₦${stateData.gridBandATariff} / kWh`;
  DOM.cardAnnualCo2.textContent = `${(genMetrics.annualCo2Kg / 1000).toFixed(1)} Tons CO2`;
  DOM.cardTenYearSpend.textContent = `10-Yr: ${CalculationEngine.formatNairaCompact(genMetrics.tenYearCost)}`;

  // 3. Renewable Energy Replacement Sizing
  const dailyKwhNeeded = genMetrics.dailyKwhGenerated;
  const facility = FACILITY_PROFILES.find(f => f.id === appState.activeFacilityId);
  const sizeConfig = facility?.sizes.find(s => s.sizeId === appState.activeSizeId) || {};
  const daytimeRatio = sizeConfig.daytimeRatio || 0.65;
  const peakLoad = Math.max(appState.peakLoadKW || 6.5, appState.avgLoadKW * 1.35);

  const renewMetrics = CalculationEngine.calculateRenewableReplacement({
    dailyKwhNeeded,
    peakLoadKW: peakLoad,
    avgLoadKW: appState.avgLoadKW,
    daytimeRatio,
    stateData
  });

  // 4. Financial Payback & ROI
  const financial = CalculationEngine.calculateFinancialROI(
    genMetrics,
    renewMetrics.recommendedMix.capex
  );

  // Render Renewable Section
  DOM.renewStateName.textContent = `${stateData.name} State`;
  DOM.recommendStateZone.textContent = `${stateData.zone} Zone`;
  DOM.recommendedMixTitle.textContent = renewMetrics.recommendedMix.title;
  DOM.recommendedMixDesc.textContent = renewMetrics.recommendedMix.description;
  DOM.recommendedCapex.textContent = CalculationEngine.formatNaira(renewMetrics.recommendedMix.capex);
  DOM.recommendedPayback.textContent = `${financial.paybackMonths} Months (${financial.paybackYears} Yrs)`;

  // Solar Specs
  DOM.solarSpecCapacity.textContent = `${renewMetrics.solar.capacityKWp} kWp`;
  DOM.solarSpecPanels.textContent = `${renewMetrics.solar.panelsCount} Units`;
  DOM.solarSpecBattery.textContent = `${renewMetrics.solar.batteryKWh} kWh (${renewMetrics.solar.batteryModulesCount}x 5.12kWh)`;
  DOM.solarSpecInverter.textContent = `${renewMetrics.solar.inverterKW} kW Pure Sine`;
  DOM.solarSpecInsolation.textContent = `${stateData.solarInsolation} PSH`;
  DOM.solarTotalCapex.textContent = CalculationEngine.formatNaira(renewMetrics.solar.costs.totalCapex);

  // Wind Specs
  DOM.windViabilityBadge.textContent = renewMetrics.wind.viability;
  DOM.windViabilityBadge.className = `text-[10px] px-2 py-0.5 rounded-full font-bold ${
    renewMetrics.wind.viability.includes('High') ? 'bg-emerald-500/20 text-emerald-300' :
    renewMetrics.wind.viability.includes('Moderate') ? 'bg-amber-500/20 text-amber-300' :
    'bg-rose-500/20 text-rose-300'
  }`;
  DOM.windSpecSpeed.textContent = `${stateData.windSpeed} m/s`;
  DOM.windSpecCapacity.textContent = `${renewMetrics.wind.capacityKW} kW`;
  DOM.windSpecUnits.textContent = `${renewMetrics.wind.unitsCount} Units (1kW)`;
  DOM.windExplanationText.textContent = renewMetrics.wind.explanation;
  DOM.windTotalCapex.textContent = CalculationEngine.formatNaira(renewMetrics.wind.totalCapex);

  // Hydro Specs
  DOM.hydroViabilityBadge.textContent = renewMetrics.hydro.viability;
  DOM.hydroViabilityBadge.className = `text-[10px] px-2 py-0.5 rounded-full font-bold ${
    renewMetrics.hydro.viability.includes('Outstanding') ? 'bg-emerald-500/20 text-emerald-300' :
    renewMetrics.hydro.viability.includes('Seasonal') ? 'bg-amber-500/20 text-amber-300' :
    'bg-slate-800 text-slate-400'
  }`;
  DOM.hydroSpecRating.textContent = stateData.hydroSuitability;
  DOM.hydroSpecCapacity.textContent = `${renewMetrics.hydro.capacityKW} kW`;
  DOM.hydroSpecBatterySaving.textContent = renewMetrics.hydro.batterySavingPercent > 0 
    ? `-${renewMetrics.hydro.batterySavingPercent}% Battery Capex` 
    : 'No Elevation Head';
  DOM.hydroExplanationText.textContent = renewMetrics.hydro.explanation;
  DOM.hydroTotalCapex.textContent = CalculationEngine.formatNaira(renewMetrics.hydro.totalCapex);

  // Render Itemized Cost List
  renderItemizedCosts(renewMetrics.solar.costs, renewMetrics.solar);

  // Render Financial ROI
  DOM.roiPaybackYears.textContent = `${financial.paybackYears} Years`;
  DOM.roiPaybackMonths.textContent = `${financial.paybackMonths} Months Breakeven`;
  DOM.roiMonthlySavings.textContent = CalculationEngine.formatNaira(financial.netMonthlySavings);
  DOM.roiTenYearNet.textContent = CalculationEngine.formatNairaCompact(financial.tenYearNetSavings);
  DOM.roiPercentBadge.textContent = `+${financial.tenYearROI}% 10-Yr ROI`;

  DOM.lcoeGenVal.textContent = `${CalculationEngine.formatNaira(financial.generatorLcoe)} / kWh`;
  DOM.lcoeRenewVal.textContent = `${CalculationEngine.formatNaira(financial.renewableLcoe)} / kWh`;
  
  const lcoeRatio = (financial.generatorLcoe / Math.max(1, financial.renewableLcoe)).toFixed(1);
  DOM.lcoeSavingsTimes.textContent = `${lcoeRatio}x cheaper`;
  const barPercent = Math.min(100, Math.max(8, Math.round((financial.renewableLcoe / financial.generatorLcoe) * 100)));
  DOM.lcoeRenewBar.style.width = `${barPercent}%`;

  // Render Charts
  renderFuelProjectionChart(genMetrics);
  renderCashflowComparisonChart(genMetrics, renewMetrics.recommendedMix.capex, financial);

  // Render Audit Report
  renderAuditReport(genMetrics, renewMetrics, financial, stateData);

  // Refresh icons
  if (window.lucide) {
    window.lucide.createIcons();
  }
}

/**
 * Render Itemized Hardware Costs for Current Sizing
 */
function renderItemizedCosts(solarCosts, solarSpecs) {
  DOM.itemizedCostList.innerHTML = `
    <div class="flex justify-between py-1 border-b border-slate-800/60">
      <span class="text-slate-400">${solarSpecs.panelsCount}x 550W Tier-1 Panels:</span>
      <span class="font-mono font-bold text-white">${CalculationEngine.formatNaira(solarCosts.panels)}</span>
    </div>
    <div class="flex justify-between py-1 border-b border-slate-800/60">
      <span class="text-slate-400">${solarSpecs.batteryModulesCount}x 5.12kWh LiFePO4:</span>
      <span class="font-mono font-bold text-cyan-400">${CalculationEngine.formatNaira(solarCosts.batteries)}</span>
    </div>
    <div class="flex justify-between py-1 border-b border-slate-800/60">
      <span class="text-slate-400">${solarSpecs.inverterKW}kW MPPT Hybrid Inverter:</span>
      <span class="font-mono font-bold text-white">${CalculationEngine.formatNaira(solarCosts.inverter)}</span>
    </div>
    <div class="flex justify-between py-1 border-b border-slate-800/60">
      <span class="text-slate-400">Racks, Cabling, SPDs & BOS:</span>
      <span class="font-mono font-bold text-slate-300">${CalculationEngine.formatNaira(solarCosts.bos)}</span>
    </div>
    <div class="flex justify-between py-1 border-b border-slate-800/60">
      <span class="text-slate-400">Certified Installation & Testing:</span>
      <span class="font-mono font-bold text-slate-300">${CalculationEngine.formatNaira(solarCosts.labor)}</span>
    </div>
    <div class="flex justify-between py-1.5 pt-2 font-bold text-xs">
      <span class="text-emerald-400">Total Installed Capex:</span>
      <span class="font-mono text-emerald-400 text-sm">${CalculationEngine.formatNaira(solarCosts.totalCapex)}</span>
    </div>
  `;
}

/**
 * Chart 1: 10-Year Cumulative Fuel Spend Projection
 */
function renderFuelProjectionChart(genMetrics) {
  const ctx = document.getElementById('fuelProjectionChart');
  if (!ctx) return;

  const years = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const fuelData = [];
  let cumSpend = 0;
  for (let yr = 1; yr <= 10; yr++) {
    const yrSpend = genMetrics.annualCost * Math.pow(1.12, yr - 1);
    cumSpend += yrSpend;
    fuelData.push(Math.round(cumSpend / 1000000)); // In Millions of Naira
  }

  if (appState.charts.fuelProjection) {
    appState.charts.fuelProjection.destroy();
  }

  appState.charts.fuelProjection = new Chart(ctx, {
    type: 'line',
    data: {
      labels: years.map(y => `Yr ${y}`),
      datasets: [
        {
          label: 'Cumulative Fuel Spend (₦ Millions)',
          data: fuelData,
          borderColor: '#f43f5e',
          backgroundColor: 'rgba(244, 63, 94, 0.12)',
          fill: true,
          tension: 0.35,
          borderWidth: 2.5,
          pointBackgroundColor: '#f43f5e',
          pointRadius: 4
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: (ctx) => ` ₦${ctx.raw} Million burned`
          }
        }
      },
      scales: {
        x: {
          grid: { color: 'rgba(255,255,255,0.05)' },
          ticks: { color: '#94a3b8', font: { size: 10 } }
        },
        y: {
          grid: { color: 'rgba(255,255,255,0.05)' },
          ticks: {
            color: '#94a3b8',
            font: { size: 10 },
            callback: (v) => `₦${v}M`
          }
        }
      }
    }
  });
}

/**
 * Chart 2: 10-Year Cash Flow Comparison (Fuel vs Renewable Capex)
 */
function renderCashflowComparisonChart(genMetrics, capex, financial) {
  const ctx = document.getElementById('cashflowComparisonChart');
  if (!ctx) return;

  const years = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const fuelCumulative = [];
  const renewableCumulative = [];

  let cumFuel = 0;
  const capexMillions = capex / 1000000;
  const annualOpexMillions = 0.03; // ~₦30,000/yr

  for (let yr = 1; yr <= 10; yr++) {
    cumFuel += (genMetrics.annualCost * Math.pow(1.12, yr - 1)) / 1000000;
    fuelCumulative.push(Number(cumFuel.toFixed(1)));

    // Capex is paid once upfront, plus small maintenance and yr 8 battery refresh
    const renewExpense = capexMillions + (annualOpexMillions * yr) + (yr >= 8 ? capexMillions * 0.25 : 0);
    renewableCumulative.push(Number(renewExpense.toFixed(1)));
  }

  if (appState.charts.cashflow) {
    appState.charts.cashflow.destroy();
  }

  appState.charts.cashflow = new Chart(ctx, {
    type: 'line',
    data: {
      labels: years.map(y => `Year ${y}`),
      datasets: [
        {
          label: 'Generator Fuel Burn (₦M)',
          data: fuelCumulative,
          borderColor: '#f43f5e',
          borderWidth: 2.5,
          tension: 0.3,
          pointRadius: 3
        },
        {
          label: 'Clean Renewable Solution (₦M)',
          data: renewableCumulative,
          borderColor: '#10b981',
          borderWidth: 2.5,
          tension: 0.1,
          pointRadius: 3
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          labels: { color: '#cbd5e1', font: { size: 11 } }
        },
        tooltip: {
          callbacks: {
            label: (ctx) => ` ${ctx.dataset.label}: ₦${ctx.raw}M`
          }
        }
      },
      scales: {
        x: {
          grid: { color: 'rgba(255,255,255,0.05)' },
          ticks: { color: '#94a3b8', font: { size: 10 } }
        },
        y: {
          grid: { color: 'rgba(255,255,255,0.05)' },
          ticks: {
            color: '#94a3b8',
            font: { size: 10 },
            callback: (v) => `₦${v}M`
          }
        }
      }
    }
  });
}

/**
 * Initialize and render the 36 Nigerian States directory cards
 */
function initStatesDirectory() {
  renderStatesGrid(Object.values(NIGERIA_STATES_DATA));
}

function renderStatesGrid(states) {
  DOM.statesCardsGrid.innerHTML = states.map(st => {
    const isSelected = st.name === appState.activeState;
    const buttonClass = isSelected ? 'bg-emerald-500 text-white' : 'bg-slate-800 text-slate-300 hover:text-emerald-400';
    const hydroTextClass = currencyBadge(st.hydroSuitability, 'text-blue-400 font-bold', 'text-slate-400', 'text-slate-400');

    return `
      <div data-state-name="${st.name}" class="${stateCardClasses(isSelected)}">
        <div class="flex items-center justify-between pb-2 border-b border-slate-800">
          <div class="flex items-center space-x-2">
            <span class="text-base">📍</span>
            <div>
              <h4 class="font-bold text-white text-sm">${st.name}</h4>
              <span class="text-[10px] text-slate-400">${st.zone} • ${st.capital}</span>
            </div>
          </div>
          <button type="button" class="select-state-btn text-[10px] px-2 py-1 rounded-md font-bold ${buttonClass}">
            ${isSelected ? 'Active' : 'Select'}
          </button>
        </div>

        <div class="grid grid-cols-2 gap-2 mt-3 text-xs">
          <div class="bg-slate-950/60 p-2 rounded-lg border border-slate-800/80">
            <span class="text-[10px] text-slate-400 block">PMS (Petrol)</span>
            <span class="font-bold text-amber-400 font-mono">₦${st.fuelPrices.petrol} / L</span>
          </div>
          <div class="bg-slate-950/60 p-2 rounded-lg border border-slate-800/80">
            <span class="text-[10px] text-slate-400 block">AGO (Diesel)</span>
            <span class="font-bold text-amber-300 font-mono">₦${st.fuelPrices.diesel} / L</span>
          </div>
          <div class="bg-slate-950/60 p-2 rounded-lg border border-slate-800/80">
            <span class="text-[10px] text-slate-400 block">Band A Tariff</span>
            <span class="font-bold text-cyan-400 font-mono">₦${st.gridBandATariff}</span>
          </div>
          <div class="bg-slate-950/60 p-2 rounded-lg border border-slate-800/80">
            <span class="text-[10px] text-slate-400 block">Solar PSH</span>
            <span class="font-bold text-emerald-400 font-mono">${st.solarInsolation} PSH</span>
          </div>
        </div>

        <div class="mt-2.5 pt-2 border-t border-slate-800/60 flex items-center justify-between text-[11px] text-slate-400">
          <span>Wind: <strong class="text-slate-200">${st.windSpeed} m/s</strong></span>
          <span>Hydro: <strong class="${hydroTextClass}">${st.hydroSuitability}</strong></span>
        </div>
      </div>
    `;
  }).join('');

  // Add click listeners
  document.querySelectorAll('.state-card').forEach(card => {
    card.addEventListener('click', () => {
      const stateName = card.getAttribute('data-state-name');
      switchActiveState(stateName);
    });
  });
}

function filterStatesCards() {
  const searchTerm = DOM.stateSearchInput.value.toLowerCase().trim();
  const zoneFilter = DOM.zoneFilterSelect.value;

  const filtered = Object.values(NIGERIA_STATES_DATA).filter(st => {
    const matchesSearch = st.name.toLowerCase().includes(searchTerm) || 
                          st.capital.toLowerCase().includes(searchTerm) ||
                          st.disco.toLowerCase().includes(searchTerm);
    const matchesZone = zoneFilter === 'ALL' || st.zone === zoneFilter;
    return matchesSearch && matchesZone;
  });

  renderStatesGrid(filtered);
}

function highlightActiveStateCard() {
  document.querySelectorAll('.state-card').forEach(card => {
    const isSelected = card.getAttribute('data-state-name') === appState.activeState;
    card.classList.toggle('border-emerald-500', isSelected);
    card.classList.toggle('bg-emerald-500/10', isSelected);
    card.classList.toggle('border-slate-800', !isSelected);
    const btn = card.querySelector('.select-state-btn');
    if (btn) {
      btn.textContent = isSelected ? 'Active' : 'Select';
      btn.className = `select-state-btn text-[10px] px-2 py-1 rounded-md font-bold ${isSelected ? 'bg-emerald-500 text-white' : 'bg-slate-800 text-slate-300 hover:text-emerald-400'}`;
    }
  });
}

/**
 * Render Executive Feasibility Audit Proposal
 */
function renderAuditReport(genMetrics, renewMetrics, financial, stateData) {
  const today = new Date();
  const dateFormatted = today.toLocaleDateString('en-NG', { year: 'numeric', month: 'long', day: 'numeric' });
  
  DOM.reportDate.textContent = dateFormatted;
  DOM.reportState.textContent = `${stateData.name} State (${stateData.zone}), Nigeria`;
  DOM.reportRefId.textContent = `NW-${stateData.name.substring(0,3).toUpperCase()}-${today.getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

  DOM.reportMonthlySpend.textContent = `${CalculationEngine.formatNaira(genMetrics.monthlyCost)} / mo`;
  DOM.reportAnnualSpend.textContent = CalculationEngine.formatNaira(genMetrics.annualCost);
  DOM.reportAnnualLiters.textContent = `${genMetrics.annualFuelLiters.toLocaleString()} Liters`;

  DOM.reportSystemCapacity.textContent = `${renewMetrics.solar.capacityKWp} kWp Solar + ${renewMetrics.solar.batteryKWh} kWh Storage`;
  DOM.reportPanelsSummary.textContent = `${renewMetrics.solar.panelsCount}x 550W Tier-1 Panels + ${renewMetrics.solar.inverterKW}kW Inverter`;
  DOM.reportTotalCapex.textContent = CalculationEngine.formatNaira(renewMetrics.recommendedMix.capex);

  DOM.reportPaybackSummary.textContent = `${financial.paybackMonths} Months Payback`;
  DOM.reportTenYearSavings.textContent = CalculationEngine.formatNairaCompact(financial.tenYearNetSavings);
  DOM.reportCo2Avoided.textContent = `${(genMetrics.annualCo2Kg / 1000).toFixed(1)} Tons/yr`;

  // Bill of Materials table
  const solar = renewMetrics.solar;
  const costs = solar.costs;
  DOM.reportBomTableBody.innerHTML = `
    <tr>
      <td class="p-3 font-semibold text-white">Tier-1 Monocrystalline Solar Panels</td>
      <td class="p-3 text-slate-400">550W Half-Cut PERC / N-Type (${renewMetrics.solar.capacityKWp} kWp array)</td>
      <td class="p-3">${solar.panelsCount} Modules</td>
      <td class="p-3 font-mono">₦420 / W</td>
      <td class="p-3 text-right font-mono font-bold text-white">${CalculationEngine.formatNaira(costs.panels)}</td>
    </tr>
    <tr>
      <td class="p-3 font-semibold text-white">LiFePO4 Lithium Battery Storage</td>
      <td class="p-3 text-slate-400">48V 100Ah Rackmount / Wallmount (6000 cycles, 85% DoD)</td>
      <td class="p-3">${solar.batteryModulesCount} Units (${solar.batteryKWh} kWh)</td>
      <td class="p-3 font-mono">₦330,000 / kWh</td>
      <td class="p-3 text-right font-mono font-bold text-cyan-400">${CalculationEngine.formatNaira(costs.batteries)}</td>
    </tr>
    <tr>
      <td class="p-3 font-semibold text-white">Pure Sine Wave Hybrid Inverter</td>
      <td class="p-3 text-slate-400">Integrated Dual MPPT Charge Controller & Bypass Switch</td>
      <td class="p-3">${solar.inverterKW} kW Rating</td>
      <td class="p-3 font-mono">₦225,000 / kW</td>
      <td class="p-3 text-right font-mono font-bold text-white">${CalculationEngine.formatNaira(costs.inverter)}</td>
    </tr>
    <tr>
      <td class="p-3 font-semibold text-white">Balance of System (BOS) & Protection</td>
      <td class="p-3 text-slate-400">DC Surge Arresters, Aluminium Racks, Breakers, 25mm Copper DC cables</td>
      <td class="p-3">Complete Kit</td>
      <td class="p-3 font-mono">14% Hardware</td>
      <td class="p-3 text-right font-mono font-bold text-slate-300">${CalculationEngine.formatNaira(costs.bos)}</td>
    </tr>
    <tr>
      <td class="p-3 font-semibold text-white">Engineering Installation & Commissioning</td>
      <td class="p-3 text-slate-400">Certified Solar Engineers, Earthing rod, Load separation & Testing</td>
      <td class="p-3">Turnkey</td>
      <td class="p-3 font-mono">8% Hardware</td>
      <td class="p-3 text-right font-mono font-bold text-slate-300">${CalculationEngine.formatNaira(costs.labor)}</td>
    </tr>
    <tr class="bg-slate-950 font-bold text-sm">
      <td colspan="4" class="p-3 text-emerald-400">TOTAL TURNKEY PROJECT ESTIMATE</td>
      <td class="p-3 text-right text-emerald-400 font-mono">${CalculationEngine.formatNaira(costs.totalCapex)}</td>
    </tr>
  `;
}

/**
 * Export JSON Audit
 */
function exportAuditJson() {
  const stateData = NIGERIA_STATES_DATA[appState.activeState];
  const genMetrics = CalculationEngine.calculateGeneratorMetrics({
    fuelType: appState.fuelType,
    fuelPricePerLiter: appState.fuelPrice,
    fuelConsumptionLitersPerHour: appState.fuelConsumption,
    dailyRuntimeHours: appState.dailyRuntime,
    avgLoadKW: appState.avgLoadKW
  });
  const renewMetrics = CalculationEngine.calculateRenewableReplacement({
    dailyKwhNeeded: genMetrics.dailyKwhGenerated,
    peakLoadKW: appState.peakLoadKW || 6.5,
    avgLoadKW: appState.avgLoadKW,
    stateData
  });
  const financial = CalculationEngine.calculateFinancialROI(genMetrics, renewMetrics.recommendedMix.capex);

  const exportData = {
    platform: "NaijaWatt Energy Transition Platform",
    generatedAt: new Date().toISOString(),
    location: {
      state: stateData.name,
      zone: stateData.zone,
      disco: stateData.disco,
      gridTariff: stateData.gridBandATariff,
      fuelPrice: appState.fuelPrice
    },
    facility: {
      category: appState.activeFacilityId,
      size: appState.activeSizeId,
      avgLoadKW: appState.avgLoadKW,
      dailyRuntimeHours: appState.dailyRuntime
    },
    generatorAudit: genMetrics,
    renewableSizing: renewMetrics,
    financialFeasibility: financial
  };

  const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `NaijaWatt-Energy-Audit-${stateData.name}-${Date.now()}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

/**
 * Fetch the current deployment URL
 */
async function fetchPublicStatus() {
  try {
    const res = await fetch('/api/public-status', { cache: 'no-store' });
    if (res.ok) {
      const data = await res.json();
      if (data.publicUrl) {
        appState.publicUrl = data.publicUrl;
        DOM.publicUrlInput.value = data.publicUrl;
        return;
      }
    }
  } catch (error) {
    console.warn('Could not load public site status:', error);
  }

  const currentOrigin = window.location.origin;
  appState.publicUrl = currentOrigin;
  DOM.publicUrlInput.value = currentOrigin;
}

/**
 * Copy Public URL to clipboard
 */
function copyPublicUrl() {
  const url = DOM.publicUrlInput.value;
  navigator.clipboard.writeText(url).then(() => {
    DOM.copyBtnText.textContent = "Copied!";
    DOM.copyPublicUrlBtn.classList.add('bg-emerald-700');
    setTimeout(() => {
      DOM.copyBtnText.textContent = "Copy";
      DOM.copyPublicUrlBtn.classList.remove('bg-emerald-700');
    }, 2000);
  });
}
