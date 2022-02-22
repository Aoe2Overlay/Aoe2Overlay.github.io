const { fetchJson } = require('./utils/fetchJson');
const { createTimeChart } = require('./utils/timeChart');
const { createPalette } = require('./utils/colors');

(async () => {
    const chartElement = document.getElementById("match-rate-rm-s-chart");
    const sliderElement = document.getElementById('match-rate-rm-s-slider');
    if(!chartElement) return;
    
    const chart = createTimeChart(chartElement, sliderElement, {title: 'Match Rate - Ranked RM (Detailed)'});

    const palette = createPalette();
    chart.addTotal(await fetchJson('/api/matchrate/rmtotal.json'), "RM Total", '#888888', "total");
    chart.addDataset(await fetchJson('/api/matchrate/rm4vs4.json'), "RM 4vs4", palette.color(), "stack");
    chart.addDataset(await fetchJson('/api/matchrate/rm3vs3.json'), "RM 3vs3", palette.color(), "stack");
    chart.addDataset(await fetchJson('/api/matchrate/rm2vs2.json'), "RM 2vs2", palette.color(), "stack");
    chart.addDataset(await fetchJson('/api/matchrate/rm1vs1.json'), "RM 1vs1", palette.color(), "stack");
    // chart.addVersions(await fetchJson('/api/versions.json'));
    chart.update();
})();