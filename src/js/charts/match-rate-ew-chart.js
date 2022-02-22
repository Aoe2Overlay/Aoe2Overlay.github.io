const { fetchJson } = require('./utils/fetchJson');
const { createTimeChart } = require('./utils/timeChart');
const { createPalette } = require('./utils/colors');

(async () => {
    const chartElement = document.getElementById("match-rate-ew-chart");
    const sliderElement = document.getElementById('match-rate-ew-slider');
    if(!chartElement) return;
    
    const chart = createTimeChart(chartElement, sliderElement, {title: 'Match Rate - Ranked EW'});

    const palette = createPalette();
    chart.addTotal(await fetchJson('/api/matchrate/ewtotal.json'), "EW Total", '#888888', "total");
    chart.addDataset(await fetchJson('/api/matchrate/ewteam.json'), "EW Team", palette.color(), "stack");
    chart.addDataset(await fetchJson('/api/matchrate/ew1vs1.json'), "EW 1vs1", palette.color(), "stack");
    chart.update();
})();