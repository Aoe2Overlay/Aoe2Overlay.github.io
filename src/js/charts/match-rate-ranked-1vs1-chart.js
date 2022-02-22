const { fetchJson } = require('./utils/fetchJson');
const { createTimeChart } = require('./utils/timeChart');
const { createPalette } = require('./utils/colors');

(async () => {
    const chartElement = document.getElementById("match-rate-ranked-1vs1-chart");
    const sliderElement = document.getElementById('match-rate-ranked-1vs1-slider');
    if(!chartElement) return;
    
    const chart = createTimeChart(chartElement, sliderElement, {title: 'Match Rate - Ranked (1vs1)'});

    const palette = createPalette();
    // chart.addTotal(await fetchJson('/api/matchrate/ranked.json'), "Total", '#888888', "total");
    chart.addDataset(await fetchJson('/api/matchrate/dm1vs1.json'), "DM", palette.color(), "stack");
    chart.addDataset(await fetchJson('/api/matchrate/ew1vs1.json'), "EW", palette.color(), "stack");
    chart.addDataset(await fetchJson('/api/matchrate/rm1vs1.json'), "RM", palette.color(), "stack");
    chart.update();
})();