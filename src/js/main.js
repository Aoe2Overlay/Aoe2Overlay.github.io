const boostrap = require('bootstrap');

require('nouislider/dist/nouislider.css');

const { Chart, registerables } = require('chart.js')
const annotationPlugin = require('chartjs-plugin-annotation');
const adapterMoment = require('chartjs-adapter-moment');

Chart.register(...registerables);
Chart.register(annotationPlugin);

require('./charts');


// https://stackoverflow.com/questions/14974394/bootstrap-datepicker-months-and-years-only
// https://www.eyecon.ro/bootstrap-datepicker/
// https://codepen.io/vsfvjiuv-the-typescripter/pen/mdMeJwL
// https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js
// https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.1.3/js/bootstrap.min.js
// https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datepicker/1.9.0/js/bootstrap-datepicker.min.js


/*
ready function ?
$(function(){
  $('#datepicker').datepicker();
});
*/