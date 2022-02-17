const { fetchJson } = require('./utils/fetchJson');
const { createTimeChart } = require('./utils/timeChart');
const { color } = require('./utils/colors');

(async () => {
    const chartElement = document.getElementById("match-rate-rm-chart");
    const sliderElement = document.getElementById('slider');
    if(!chartElement) return;
    
    const chart = createTimeChart(chartElement, sliderElement);

    chart.addDataset(await fetchJson('/api/matchrate/rm1vs1.json'), "RM 1vs1", color(), "rm");
    chart.addDataset(await fetchJson('/api/matchrate/rm2vs2.json'), "RM 2vs2", color(), "rm");
    // chart.addVersionAnnotations(await fetchJson('/api/versions.json'));
    chart.update();
})();