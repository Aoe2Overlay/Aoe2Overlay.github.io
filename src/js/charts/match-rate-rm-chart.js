const { fetchJson } = require('./utils/fetchJson');
const { createTimeChart } = require('./utils/timeChart');

(async () => {
    const chartElement = document.getElementById("match-rate-rm-chart");
    const sliderElement = document.getElementById('slider');
    if(!chartElement) return;
    
    const chart = createTimeChart(chartElement, sliderElement);

    chart.addDataset(await fetchJson('/api/matchrate/rm1vs1.json'), "RM 1vs1", "#dc0ab4", "rm-1vs1");
    // chart.addVersionAnnotations(await fetchJson('/api/versions.json'));
    chart.update();
})();