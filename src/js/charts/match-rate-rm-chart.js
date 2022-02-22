const { fetchJson } = require('./utils/fetchJson');
const { createTimeChart } = require('./utils/timeChart');
const { createPalette } = require('./utils/colors');

(async () => {
    const chartElement = document.getElementById("match-rate-rm-chart");
    const sliderElement = document.getElementById('match-rate-rm-slider');
    if(!chartElement) return;
    
    const chart = createTimeChart(chartElement, sliderElement, {title: 'Match Rate - Ranked RM'});

    const palette = createPalette();
    chart.addTotal(await fetchJson('/api/matchrate/rmtotal.json'), "RM Total", '#888888', "total");
    chart.addDataset(await fetchJson('/api/matchrate/rmteam.json'), "RM Team", palette.color(), "stack");
    chart.addDataset(await fetchJson('/api/matchrate/rm1vs1.json'), "RM 1vs1", palette.color(), "stack");
    chart.update();
})();