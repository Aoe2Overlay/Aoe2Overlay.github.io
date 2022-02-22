const { fetchJson } = require('./utils/fetchJson');
const { createTimeChart } = require('./utils/timeChart');
const { createPalette } = require('./utils/colors');

(async () => {
    const chartElement = document.getElementById("match-rate-total-chart");
    const sliderElement = document.getElementById('match-rate-total-slider');
    if(!chartElement) return;
    
    const chart = createTimeChart(chartElement, sliderElement, {title: 'Match Rate - Total'});

    const palette = createPalette();
    chart.addTotal(await fetchJson('/api/matchrate/total.json'), "Total", '#888888', "total");
    chart.addDataset(await fetchJson('/api/matchrate/ranked.json'), "Ranked", palette.color(), "stack");
    chart.addDataset(await fetchJson('/api/matchrate/unranked.json'), "Unranked", palette.color(), "stack");
    chart.update();
})();