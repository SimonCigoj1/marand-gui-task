/**
 * 
 */
//global data store variables
var diastoloc = []; 
var systolic = [];
var dates = [];
var temperature = [];
var feaver = [];
var heartRate = [];
var saturation = [];
var startDate;


function parseDate(date){
	var parts = date.split("-");
   return Date.UTC(parts[0], parts[1]-1, parts[2]); 
}

function roundToTwo(num) {    
    return +(Math.round(num + "e+2")  + "e-2");
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
		            text: ''
		        },
		        legend :{
		        	align:'right',
		        	floating:'true',
		        	verticalAlign: 'top'
		        },
		        yAxis: {
		        	min:30,
		            title: {
		                text: ''
		            }
		        },
		        xAxis: {
		            type: 'datetime',
		            dateTimeLabelFormats: {
		                day: '%e. %b'
		            }
		        },
		        tooltip: {
	                valueSuffix: 'mm[Hg]'
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
	  
	 var num = 0;
	 var normalNum = 0;
	 var feaverNum = 0;
     $.each( data.measurements, function( i, item ) {
    	  itemDate = parseDate(item.date);
    	  var highTmpRange = [];
    	  
    	  tempValue = Number(item.temperature); 
    	  num++;
    	  if (tempValue <= idealTemperature) {
    		  temperature.push(tempValue);
    		  feaver.push(0);
    		  normalNum++;
    	  } else {
    		  var difference = tempValue - idealTemperature;
    		  feaver.push(roundToTwo(difference));
    		  temperature.push(idealTemperature);
    		  feaverNum++;
    	  }
    	  
     });
      
     var normalTempPercent = (normalNum / num) * 100;
     var feaverTempPercent = (feaverNum / num) * 100;
     
     normalTempPercent = Math.round(normalTempPercent * 100) / 100;
     feaverTempPercent = Math.round(feaverTempPercent * 100) / 100;
     
     var options = {
		        chart: {
		            renderTo: 'temperatureChart'
		        },
		        plotOptions: {
		            series: {
		                fillOpacity: 0.7
		            },
		        	column: {
		        		stacking: 'normal'
		        	}
		        },
		        title: {
		            text: ''
		        },
		        legend :{
		        	align:'right',
		        	floating:'true',
		        	verticalAlign: 'top'
		        },
		        yAxis: {
		        	title: {
		                text: ''
		            }
		        },
		        xAxis: {
		            type: 'datetime',
		            dateTimeLabelFormats: {
		                day: '%e. %b'
		            }
		        },
	            tooltip: {
	                formatter: function() {
	                	
	                	var s;
	                    if (this.point.name) { // the pie chart
	                        s = this.point.name +': '+ this.y +' % of time';
	                        return s;
	                    } else {
	                    	var d = new Date();
		                	d.setTime(this.x);
		                	
		                	var day = d.getDate();
		                	var month = d.getMonth();
		                	   	
		                	
		                    return '<b>'+ day + '.' + month +'</b><br/>'+
		                        'Temperature: '+ this.point.stackTotal + '°C';
	                    }
	                	
	                	
	                }
	            },
		        series: [
		        {
		            name: 'Feaver',
		            data: [{}],
		            type: 'column',
		            stack: 'temperature',
		            color: '#FF6161',
		            fillOpacity: 0.7,
		            zIndex:2,
		            marker: {
	                    enabled: false
	                },
	                animation: false,
	                pointInterval: 24 * 3600 * 1000 // one day
		        },
		        {
		            name: 'Normal temperature',
		            data: [{}],
		            type: 'column',
		            stack: 'temperature',
		            color: '#F6BB42',
		            fillOpacity: 0.7,
		            zIndex:3,
		            marker: {
	                    enabled: false
	                },
	                animation: false,
	                pointInterval: 24 * 3600 * 1000 // one day
		        },
		        {
		            type: 'pie',
		            name: 'Total consumption',
		            data: [{
		                name: 'normal temperature',
		                y: normalTempPercent,
		                color: '#F6BB42'
		            }, {
		                name: 'feaver',
		                y: feaverTempPercent,
		                color: '#FF6161'
		            }],
		            center: [50, 35],
		            size: 80,
		            showInLegend: false,
		            dataLabels: {
		                enabled: false
		                
		            }
			}
		        
		       ]
		        
		    }; 
      
            
      options.series[0].pointStart = startDate;
      options.series[0].data = feaver;
      
      options.series[1].pointStart = startDate;
      options.series[1].data = temperature;
      
      var maxY = Math.max.apply(Math,temperature)+2; 
      var minY= Math.min.apply(Math,temperature)-2;
      
      options.yAxis.min = minY;
         
      var temperatureChart = new Highcharts.Chart(options);
      
    
}

function drawHeartRateData(data){
		  
	var startDate = new Date(); 
	  
    $.each( data.measurements, function( i, item ) {
  	   	heartRate.push(item.heartRate);
    });

   // alert(temperatureHigh);
    
	 var options = {
		        chart: {
		            renderTo: 'heartRateChart',
		            type: 'area'
		        },
		        plotOptions: {
		            series: {
		                fillOpacity: 0.7
		            }
		        },
		        title: {
		            text: ''
		        },
		        legend :{
		        	enabled:false
		        },
		        yAxis: {
		        	title: {
		                text: ''
		            }
		        },
		        xAxis: {
		            type: 'datetime',
		            dateTimeLabelFormats: {
		                day: '%e. %b'
		            }
		        },
		        tooltip: {
	                valueSuffix: '/min'
	            },
		        series: [
		        {
		            name: 'Heart Rate',
		            data: [{}],
		            type: 'area',
		            color: '#FFBF6C',
		            fillOpacity: 0.7,
		            zIndex:2,
		            marker: {
	                    enabled: false
	                },
	                animation: false,
	                pointInterval: 60 * 1000 // one hour
		        }
		       ]
		        
		    }; 	
    
    options.series[0].pointStart = startDate.getTime()+3600000;
    options.series[0].data = heartRate;
    
    var maxY = Math.max.apply(Math,heartRate)+10; 
    var minY= Math.min.apply(Math,heartRate)-10;
    
    options.yAxis.min = minY;
    options.yAxis.max = maxY;
    
    var temperatureChart = new Highcharts.Chart(options);

  
    
  
}

function drawSaturationData(data){
	  
	var startDate = new Date();
	
	
	
	
    $.each( data.measurements, function( i, item ) {
    	saturation.push(item.spq2numerator);
    });

   
	 var options = {
		        chart: {
		            renderTo: 'saturationChart',
		            type: 'area'
		        },
		        plotOptions: {
		            series: {
		                fillOpacity: 0.7
		            }
		        },
		        title: {
		            text: ''
		        },
		        legend :{
		        	enabled:false
		        },
		        yAxis: {
		        	title: {
		                text: ''
		            }
		        },
		        xAxis: {
		            type: 'datetime',
		            dateTimeLabelFormats: {
		                day: '%e. %b'
		            }
		        },
		        tooltip: {
	                valueSuffix: '%'
	            },
		        series: [
		        {
		            name: 'saturation',
		            data: [{}],
		            type: 'area',
		            color: '#3BAFDA',
		            fillOpacity: 0.7,
		            zIndex:2,
		            marker: {
	                    enabled: false
	                },
	                animation: false,
	                pointInterval: 60 * 1000 // one day
		        }
		       ]
		        
		    }; 	
    
    options.series[0].pointStart = startDate.getTime()+3600000;
    options.series[0].data = saturation;
    
    var maxY = Math.max.apply(Math,saturation)+2; 
    var minY= Math.min.apply(Math,saturation)-10;
    
    options.yAxis.min = minY;
    options.yAxis.max = maxY;
    
    var saturationChart = new Highcharts.Chart(options);

    saturationChart.yAxis[0].addPlotLine({
          value: 100,
          color: 'blue',
          width: 1,
          id: 'plot-line-1',
          dashStyle: 'ShortDash',
          zIndex:10,
          label: {
          		text: ''
	      }
      });
 
    
  
}