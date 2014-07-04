/**
 * 
 */
//global data store variables
var diastoloc = []; 
var systolic = [];
var dates = [];
var temperature = [];
var temperatureHigh = [];
var startDate;


function parseDate(date){
	var parts = date.split("-");
   return Date.UTC(parts[0], parts[1]-1, parts[2]); 
}

function drawBloodPressureData(data){
	  var options = {
		        chart: {
		            renderTo: 'bloodPressureChart',
		            type: 'area'
		        },
		        plotOptions: {
		            series: {
		                fillOpacity: 0.7
		            }
		        },
		        title: {
		            text: 'Blood pressure'
		        },
		        subtitle: {
		            text: 'Diastolic and systolic blood pressure daily measurements'
		        },
		        yAxis: {
		            title: {
		                text: 'Blood pressure'
		            }
		        },
		        xAxis: {
		            type: 'datetime',
		            dateTimeLabelFormats: {
		                day: '%e. %b'
		            }
		        },
		        series: [
		        {
		            name: 'Systolic',
		            data: [{}],
		            type: 'area',
		            color: '#FFB85C',
		            zIndex:2,
		            marker: {
	                    enabled: false
	                },
	                animation: false,
	                pointInterval: 24 * 3600 * 1000 // one day
		        },
		        {
		            name: 'Diastolic',
		            data: [{}],
		            type: 'area',
		        	color: '#5CA4FF',
		        	zIndex:10,
		        	fillOpacity: 0.8,
		        	marker: {
	                    enabled: false
	                },
	                animation: false,
		        	pointInterval: 24 * 3600 * 1000 // one day
		        }]
		        
		    }; 	
  	  
	    var startDate = parseDate(data.measurements[0].date); 
  	  
        $.each( data.measurements, function( i, item ) {
            diastoloc.push(item.diastoloc);
        	systolic.push(item.systolic);
        	dates.push(item.date);
        });

        options.series[0].pointStart = startDate;
        options.series[1].pointStart = startDate;
        options.series[1].data = diastoloc;
        options.series[0].data = systolic;
        
        var bloodPressureChart = new Highcharts.Chart(options);

        bloodPressureChart.yAxis[0].addPlotLine({
              value: 80,
              color: 'red',
              width: 1,
              id: 'plot-line-1',
              dashStyle: 'ShortDash',
              zIndex:3,
              label: {
              	text: 'opt. < 80'
	            }
          });

        bloodPressureChart.yAxis[0].addPlotLine({
              value: 120,
              color: 'blue',
              width: 1,
              dashStyle: 'ShortDash',
              id: 'plot-line-2',
              zIndex:1,
              label: {
              	text: 'opt. < 120'
	            }
          })
}


function drawTemperatureData(data){
	

	  
	  var startDate = parseDate(data.measurements[0].date); 
	  
	  var idealTemperature = 37;
	  
      $.each( data.measurements, function( i, item ) {
    	  
    	  itemDate = parseDate(item.date);
    	  
    	  var highTmpRange = [];
    	  
    	  temperature.push(item.temperature);
    	  

      });

     // alert(temperatureHigh);
      
 	 var options = {
		        chart: {
		            renderTo: 'temperatureChart',
		            type: 'area'
		        },
		        plotOptions: {
		            series: {
		                fillOpacity: 0.7
		            }
		        },
		        title: {
		            text: 'Temperature'
		        },
		        subtitle: {
		            text: 'Patient temperature measurements'
		        },
		        yAxis: {
		        	title: {
		                text: 'Temperature'
		            }
		        },
		        xAxis: {
		            type: 'datetime',
		            dateTimeLabelFormats: {
		                day: '%e. %b'
		            }
		        },
		        tooltip: {
	                valueSuffix: '°C'
	            },
		        series: [
		        {
		            name: 'Temperature',
		            data: [{}],
		            type: 'area',
		            color: '#FFBF6C',
		            fillOpacity: 0.7,
		            zIndex:2,
		            marker: {
	                    enabled: false
	                },
	                animation: false,
	                pointInterval: 24 * 3600 * 1000 // one day
		        }
		       ]
		        
		    }; 	
      
      options.series[0].pointStart = startDate;
      options.series[0].data = temperature;
      
      var maxY = Math.max.apply(Math,temperature)+2; 
      var minY= Math.min.apply(Math,temperature)-2;
      
      options.yAxis.min = minY;
      options.yAxis.max = maxY;
      
      var temperatureChart = new Highcharts.Chart(options);

      temperatureChart.yAxis[0].addPlotLine({
            value: idealTemperature,
            color: 'blue',
            width: 1,
            id: 'plot-line-1',
            dashStyle: 'ShortDash',
            zIndex:10,
            label: {
            	text: 'feaver 37'
	            }
        });
      
      temperatureChart.yAxis[0].addPlotBand({
          from: idealTemperature,
          to: maxY+2,
          color: 'rgba(255,0,0,0.1)',
          id: 'plot-band-1',
          zIndex:1,
          fillOpacity: 0.3
      });
      
      temperatureChart.yAxis[0].addPlotBand({
          from: minY-2,
          to: idealTemperature,
          color: 'rgba(104,188,255,0.3)',
          id: 'plot-band-1',
          zIndex:1,
          fillOpacity: 0.3
      });
      
      /*plotBands: [{ // Light air
          from: 0.3,
          to: 1.5,
          color: 'rgba(68, 170, 213, 0.1)',
          label: {
              text: 'Light air',
              style: {
                  color: '#606060'
              }
          }
      }*/
      
      

    
}