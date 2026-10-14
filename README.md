
# Naija Watt
NaijaWatt

Generator runtime tracker and renewable energy replacement sizer for Nigeria.

Overview

NaijaWatt shows what a petrol or diesel generator really costs, then sizes a solar, wind or micro-hydro system to replace it, using fuel prices, DisCo tariffs and renewable resource data for the 36 states and the FCT.

Features
Generator tracker: petrol or diesel, fuel use (L/hr), daily runtime and load (kW). Shows cost per hour, monthly and annual spend, litres burned, cost per kWh versus grid tariff, and CO2 per year.
Spend forecast: cumulative fuel cost with 12% compound fuel price inflation (1-month, 1-year and 10-year).
Facility profiles: Commercial Shop, Residential Home, Factory/Industrial and Custom, each with load, schedule and generator size defaults.
Renewable sizing: solar PV with LiFePO4 storage, wind and micro-hydro, with a recommended configuration per region.
State price engine: fuel prices, DisCo Band A tariff, solar insolation, wind and hydro potential, filterable by geopolitical zone.
ROI: payback period, net monthly savings, 10-year net ROI, LCOE comparison and cash flow comparison.
Executive audit: printable report with bill of materials, plus PDF print and JSON export.
Default benchmarks
Item	Price	Unit
Tier-1 mono solar panels (550W)	₦420	per W
LiFePO4 battery	₦330,000	per kWh
Hybrid inverter	₦225,000	per kW
Balance of system	14%	of hardware
Installation labour	8%	of hardware
Wind system (installed)	₦1.25M	per kW
Micro-hydro (installed)	₦1.10M	per kW
Getting started

No build step needed. The app loads js/app.js as an ES module, so serve it over HTTP rather than opening the file directly.

bash
python3 -m http.server 8000
# then visit http://localhost:8000

An internet connection is needed on first load for the CDN libraries and fonts.

Project structure
index.html   # layout, six sections, audit report and share modal
js/app.js    # calculations, state data, charts and interactions
Tech stack
HTML, Tailwind CSS (CDN) and JavaScript (ES modules)
Chart.js for charts and Lucide for icons
Google Fonts: Plus Jakarta Sans and JetBrains Mono
Customising
Prices, tariffs and state data: edit the data in js/app.js.
Equipment benchmarks: update the local market benchmark values and the matching figures in index.html.
Branding and layout: edit the Tailwind theme colours at the top of index.html.
Known limitations
Results are estimates, not engineering or financial advice.
Prices and tariffs are fixed benchmarks, not live data. Verify them against current quotes.
Wind and hydro suitability depends on the actual site, not just state averages.
Notes
This README was written from index.html only. js/app.js was not available, so formulas and the full state dataset are not documented. Figures shown are the default Lagos scenario.
The page states it is ready for static hosting on Vercel, Render or Netlify.

