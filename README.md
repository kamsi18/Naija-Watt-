# 🇳🇬 NaijaWatt: Nigerian Energy Transition & Generator Replacement Platform

> **Local Access URL**: [http://localhost:3000](http://localhost:3000)  
> **Public access**: Deploy to Render using the steps below to get a persistent public URL.

**NaijaWatt** is an end-to-end, data-driven web platform designed specifically for the Nigerian energy landscape following national fuel subsidy removals and DisCo electricity tariff adjustments (Band A MYTO). It enables home owners, retail businesses, and industrial factory operators across Nigeria to audit their generator runtime and fuel bleed, forecast long-term expenses, and precisely size turnkey renewable energy replacements (**Solar PV + LiFePO4 batteries, Micro-Wind, and Pico/Micro-Hydro**).

---

## 🌟 Key Features Built to Specification

### 1. Generator Runtime, Fuel Use & Cost Forecaster
- **Live Hourly Cost Calculation**: Computes exact hourly fuel burn in Naira (`₦/hr`) plus amortized engine lube oil and servicing.
- **Spend Forecasting**: Real-time forecasts for:
  - Daily Fuel Spend & Liters Burned.
  - Monthly Forecast (30-day projection).
  - Annual Cumulative Spend (365-day projection).
  - **10-Year Cumulative Fuel Sinkhole**: Factoring in compound Nigerian fuel inflation (10-15%/year).
- **Effective Cost per kWh**: Compares the true generator cost per kWh (`₦350 - ₦650/kWh`) against DisCo Band A tariffs (`₦206 - ₦225/kWh`).
- **Carbon Footprint Tracking**: Calculates annual CO2 tons emitted and number of mature trees required to offset emissions.

### 2. Renewable Energy Replacement Sizing (Solar, Wind, Hydro)
- **Solar PV + LiFePO4 Battery Storage**:
  - Automatically calculates array capacity (`kWp`) from daily kilowatt-hour demand and state-specific Peak Sun Hours (PSH).
  - Recommends number of standard 550W Tier-1 Monocrystalline panels.
  - Sizes Grade-A LiFePO4 battery storage (`kWh` & standard 5.12kWh rackmount modules) with 85% Depth of Discharge and autonomy margins.
  - Pure sine wave hybrid inverter sizing (`kW`) with motor surge handling.
- **Micro-Wind Energy**:
  - Calibrated against average wind speeds in that Nigerian state.
  - Identifies viability rating (e.g. *High/Prime Wind Corridor* in Sokoto/Katsina/Kano/Plateau vs *Coastal Breeze* in Lagos/Rivers vs *Low* inland).
  - Sizes supplemental or standalone wind turbine units (`kW`).
- **Micro-Hydroelectric Energy**:
  - Evaluates geographic elevation head and water stream feasibility.
  - Explains the continuous baseload advantage: running water eliminates up to 75% of expensive battery replacement cycles in highland states like Plateau (Jos), Taraba (Mambilla), Niger, Cross River (Obudu), Ondo, Ekiti, and Kogi.
- **Smart Hybrid Optimization Recommendation**: Recommends the optimal blend for the specific location and facility scale.

### 3. Multi-Installation & Facility Connect (Varying Sizes)
Supports switching or combining load profiles:
- **Commercial Shop / Retail**:
  - *Small Shop / Kiosk / Barbershop* (1.2 kW avg / 1.8 kW peak)
  - *Medium Supermarket / Pharmacy / Clinic* (4.5 kW avg / 6.5 kW peak)
  - *Large Supermarket / Cold Room / Bakery* (18.0 kW avg / 24.0 kW peak)
- **Residential Building**:
  - *1-2 Bedroom Apartment* (1.4 kW avg / 2.2 kW peak)
  - *3-4 Bedroom Flat / House* (3.6 kW avg / 5.5 kW peak)
  - *5-Bedroom Duplex / Mansion* (8.5 kW avg / 12.0 kW peak)
  - *Multi-Tenant Estate (6-8 Flats Compound)* (26.0 kW avg / 38.0 kW peak)
- **Factory / Industrial Facility**:
  - *Light Industrial / Printing / Workshop* (14.0 kW avg / 20.0 kW peak)
  - *Medium Processing / Bottling / Plastics* (55.0 kW avg / 75.0 kW peak)
  - *Heavy Manufacturing / Agro-Mill / Steelworks* (190.0 kW avg / 260.0 kW peak)
- **Custom Facility**: Fully adjustable loads, runtime, and power factor.

### 4 & 5. Nigerian Regional Database (All 36 States + FCT Abuja)
Integrated dataset for all 36 Nigerian states and Abuja:
- Primary Distribution Company (EKEDC, IKEDC, AEDC, IBEDC, EEDC, BEDC, PHED, KEDCO, KAEDCO, JED, YEDC).
- DisCo Band A Tariffs (`₦/kWh`).
- PMS (Petrol) pump prices (`₦855 - ₦1,120/L`).
- AGO (Diesel) pump prices (`₦1,140 - ₦1,450/L`).
- Solar Insolation (`4.1 - 6.65 kWh/m²/day`).
- Average Wind Speeds (`m/s`).
- Hydroelectric Suitability Index and river basin notes.

### 6. Local Nigerian Equipment & Contracting Prices
Verified Nigerian solar market rates (in ₦ Naira):
- **Tier-1 Monocrystalline Solar Panels**: `₦420 / Watt` (Longi, Jinko, Canadian Solar).
- **LiFePO4 Lithium Batteries**: `₦330,000 / kWh` (Felicity, Pylontech, Deye).
- **Hybrid MPPT Inverters**: `₦225,000 / kW`.
- **Balance of System (BOS)**: 14% of hardware (cables, aluminium racks, surge arresters, changeovers).
- **Certified Installation Labor**: 8% of equipment.
- **Wind Turbine Kits**: `₦1,250,000 / kW` installed.
- **Micro-Hydro Water Systems**: `₦1,100,000 / kW` installed.
- **Financial Metrics**: Upfront Capex, Simple Payback Period (Months/Years), 10-Year Cumulative Cash Flow Comparison, and Levelized Cost of Energy (LCOE).

### 7. Public Accessibility & Global Sharing
- Deploy to Render for a stable public URL that can be revisited and shared without keeping your computer or a tunnel process online.
- Includes cloud deployment manifests (`vercel.json`, `render.yaml`, `Dockerfile`).

---

## 🚀 Running the Project

### Local Development
On Windows, double-click `Open NaijaWatt.cmd` in this folder for one-click access. It starts the server if needed and opens the site in your browser. If you open `public/index.html` directly while the server is running, it redirects to the working site; if not, it tells you to launch the CMD file. Browsers do not allow an HTML page to start a local server by itself.

To start the local server manually:
```powershell
Set-Location .\naijawatt
npm.cmd install
npm.cmd start
```
Then open [http://localhost:3000](http://localhost:3000) in your browser.

### Temporary Public Tunnel
For a temporary link while your computer is on, start the app with:
```bash
npm run tunnel
```
This starts the local server and creates a temporary public URL via LocalTunnel. The link stops working when the tunnel closes and may change after restarting it. Use Render for a link you can revisit.

### Persistent Public Deployment (Render)
1. Push the `naijawatt` folder to its own GitHub repository, with `package.json` and `render.yaml` at the repository root.
2. In Render, choose **New + → Blueprint**, connect that repository, and deploy the `render.yaml` blueprint.
3. Open the stable `onrender.com` URL Render assigns. The app's Share link reads the active deployment URL automatically.

The included free Render plan keeps the same URL, but may spin down after inactivity and take a short time to wake on the next visit. Choose a paid always-on plan if immediate availability is required.

### Other Deployment Options
- **Vercel**: Deploy with `vercel` or link your GitHub repository. Uses `vercel.json`.
- **Docker**: Build using `Dockerfile` and run the container on a host that supports persistent web services.

Prices and tariffs are fixed benchmarks, not live data. Verify them against current quotes.
Wind and hydro suitability depends on the actual site, not just state averages.


