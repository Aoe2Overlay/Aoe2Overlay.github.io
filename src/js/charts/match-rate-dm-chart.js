const { fetchJson } = require('./utils/fetchJson');
const { createTimeChart } = require('./utils/timeChart');
const { createPalette } = require('./utils/colors');

(async () => {
    const chartElement = document.getElementById("match-rate-dm-chart");
    const sliderElement = document.getElementById('match-rate-dm-slider');
    if(!chartElement) return;
    
    const chart = createTimeChart(chartElement, sliderElement, {title: 'Match Rate - Ranked DM'});

    const palette = createPalette();
    chart.addTotal(await fetchJson('/api/matchrate/dmtotal.json'), "DM Total", '#888888', "total");
    chart.addDataset(await fetchJson('/api/matchrate/dmteam.json'), "DM Team", palette.color(), "stack");
    chart.addDataset(await fetchJson('/api/matchrate/dm1vs1.json'), "DM 1vs1", palette.color(), "stack");
    chart.update();
})();