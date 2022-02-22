const { fetchJson } = require('./utils/fetchJson');
const { createTimeChart } = require('./utils/timeChart');
const { createPalette } = require('./utils/colors');

(async () => {
    const chartElement = document.getElementById("match-rate-ranked-chart");
    const sliderElement = document.getElementById('match-rate-ranked-slider');
    if(!chartElement) return;
    
    const chart = createTimeChart(chartElement, sliderElement, {title: 'Match Rate - Ranked'});

    const palette = createPalette();
    chart.addTotal(await fetchJson('/api/matchrate/ranked.json'), "Total", '#888888', "total");
    chart.addDataset(await fetchJson('/api/matchrate/dmtotal.json'), "DM", palette.color(), "stack");
    chart.addDataset(await fetchJson('/api/matchrate/ewtotal.json'), "EW", palette.color(), "stack");
    chart.addDataset(await fetchJson('/api/matchrate/rmtotal.json'), "RM", palette.color(), "stack");
    chart.update();
})();