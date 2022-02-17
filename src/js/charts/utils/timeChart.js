const { Chart } = require('chart.js');
const noUiSlider = require('nouislider')

const { createSliderLabels } = require('./sliderLabels');
const { createChartLabels } = require('./chartLabels');
const { stringToDate } = require('./stringToDate');

const createTimeChart = (chartElement, sliderElement, options) => {

    const obj = {
        sliderElement: sliderElement,
        chartElement: chartElement,
        annotations: [],
        datasets: [],
    };

    const sliderLabels = createSliderLabels();

    if(sliderElement) {
    
        const tooltipFormat = {
            to: function(value) {
                const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
                const date = sliderLabels[parseInt(value)];
                return `${months[date.getMonth()]} ${date.getFullYear()}`;
            }
        };

        const min = 0;
        const max = sliderLabels.length - 1;

        noUiSlider.create(sliderElement, {
            start: [min, max],
            step: 1,
            margin: 0,
            tooltips: [tooltipFormat, tooltipFormat],
            connect: true,
            range: {
                'min': min,
                'max': max
            }
        });
        obj.slider = sliderElement?.noUiSlider;
    }

    if(!chartElement) return null;

    obj.chart = new Chart(chartElement, {
        type: 'line',
        data: {
            labels: createChartLabels()
        },
        options: {
            responsive: true,
            scales: {
                x: {
                    type: 'time',
                    title: {
                        display: false,
                        text: 'Date'
                    },
                    time: {
                        // unit: 'month',
                        minUnit: 'day'
                    },
                },
                y: { 
                    stacked: true,
                    title: {
                        display: true,
                        text: 'Number of Matches'
                    },
                    min: 0,
                },
            },
            plugins: {
                autocolors: false,
                annotation: { 
                },
                title: {
                    display: true,
                    text: 'Match Rate - Ranked RM'
                },
            },
        }
    });

    obj.addVersionAnnotations = (data) => {
        obj.annotations.push(data);
        let annotations = obj.chart.options.plugins.annotation.annotations;
        data.forEach((item, i) => {
            annotations[`v${item.version}`] = {
                type: 'line',
                label: {
                    enabled: true,
                    // backgroundColor: i % 2 === 0 ? 'rgb(255, 99, 132)' : 'rgb(132, 99, 255)',
                    backgroundColor: 'rgb(255, 99, 132)',
                    content: `${item.version}`,
                    position: i % 2 === 0 ? 'start' : 'end',
                    rotation: 'auto',
                    padding: {
                        left: 5,
                        right: 5,
                        top: 2,
                        bottom: 2
                    },
                    borderRadius: 5,
                    font: {
                        size: 10
                    },
                    },
                xMin: stringToDate(item.date),
                xMax: stringToDate(item.date),
                // borderColor: i % 2 === 0 ? 'rgb(255, 99, 132)' : 'rgb(132, 99, 255)',
                borderColor: 'rgb(255, 99, 132)',
                borderWidth: 1
            }
        });
    }

    obj.addDataset = (data, label, color, stack) => {
        obj.datasets.push(data.map($ => {return {x: stringToDate($.date), y: $.count}}));
        obj.chart.data.datasets.push({
            data: data.map($ => {return {x: stringToDate($.date), y: $.count}}),
            label: label,
            type: 'line',
            stack: stack,
            borderColor: color,
            backgroundColor: color,
            fill: true
        })
    }


    obj.slider.on('change', () => {
        let i = sliderElement.noUiSlider.get().map(i => parseInt(i));
        let from = new Date(sliderLabels[i[0]]);
        let to = new Date(sliderLabels[i[1]]);

        to.setMonth(to.getMonth() + 1);

        let createFrom = i[0] == 0 ? null : from;
        let createTo = i[1] == sliderLabels.length-1 ? null : to;

        obj.chart.data.labels = createChartLabels(createFrom, createTo);

        // obj.chart.options.scales.x.ticks.min = from;
        // obj.chart.options.scales.x.ticks.max = to;

        obj.datasets.forEach((data, i) => {
            obj.chart.data.datasets[i].data = data.filter(($) => {
                return from.getTime() < $.x.getTime() && to.getTime() > $.x.getTime();
            });
        });

        let annotations = obj.chart.options.plugins.annotation.annotations;
        (obj.annotations[0] ?? [])
        // .filter(($) => {
        //     const date = stringToDate($.date);
        //     console.log(from.getTime() < date.getTime() && to.getTime() > date.getTime())
        //     return from.getTime() < date.getTime() && to.getTime() > date.getTime();
        // })
        .forEach((item)=> {
            const i = `v${item.version}`;
            const date = stringToDate(item.date);
            // annotations[i].xMin = stringToDate(item.date);
            // annotations[i].xMin = stringToDate(item.date);
            annotations[i].enabled = from.getTime() < date.getTime() && to.getTime() > date.getTime();
        });
        
        obj.chart.update();
    });

    obj.update = () => {
        obj.chart.update();
    }

    return obj;
}

export { createTimeChart };