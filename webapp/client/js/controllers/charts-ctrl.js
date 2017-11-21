(function(){

	var app = angular.module('app');

	app.controller('ChartsCtrl', ['$scope', '$http', '$interval', 'socket', function($scope, $http, $interval, socket){
		var self = this;

		var totalPoints = 40;

		var data = [Array.apply(null, Array(totalPoints)).map(Number.prototype.valueOf,0),
					Array.apply(null, Array(totalPoints)).map(Number.prototype.valueOf,0),
					Array.apply(null, Array(totalPoints)).map(Number.prototype.valueOf,0)
				]


		/*setup for dynamic charts */
		var dynamicChartSetupEnergy = {
            series: {
                label: "Server Process Data",
                lines: {
                    show: true,
                    lineWidth: 0.2,
                    fill: 0.4
                },
    
                //color: '#edeff0',
                color: '#EDEFF0',
                shadowSize: 5,
                points: {show:true, fill:false}
            },
            yaxis: {
                min: 195,
                max: 255,
                tickColor: '#31424b',
                font :{
                    lineHeight: 13,
                    style: "normal",
                    color: "#98a7ac"
                },
                shadowSize: 0
    
            },
            xaxis: {
                tickColor: '#31424b',
                show: true,
                font :{
                    lineHeight: 13,
                    style: "normal",
                    color: "#98a7ac"
                },
                shadowSize: 0,
                min: 0,
                max: 30
            },
            grid: {
                borderWidth: 1,
                borderColor: '#31424b',
                labelMargin:10,
                mouseActiveRadius:6
            },
            legend:{
                show: false
            }
        };

        /* For Frequency Graph */
        var dynamicChartSetupFrequency = angular.copy(dynamicChartSetupEnergy);
        dynamicChartSetupFrequency.yaxis.min = 0;
        dynamicChartSetupFrequency.yaxis.max = 65;

        /* For Rate Graph */
        var dynamicChartSetupRate = angular.copy(dynamicChartSetupEnergy);
        dynamicChartSetupRate.yaxis.min = 795;
        dynamicChartSetupRate.yaxis.max = 1605;



        var energy_plot;
        var frequency_plot;
        var rate_plot;


		 /* Create Chart */
	    /* 200 to 250 */
	    if ($('#chart-dynamic-energy')[0]) {
	        energy_plot = $.plot("#chart-dynamic-energy", [ getCurrentData(0, 0) ], dynamicChartSetupEnergy);
	    }

	    /* 0 to 60 Hz */
	    if ($('#chart-dynamic-frequency')[0]) {
	        frequency_plot = $.plot("#chart-dynamic-frequency", [ getCurrentData(0, 1) ], dynamicChartSetupFrequency);
	    }

	    /* 800 to 1500 */
	    if ($('#chart-dynamic-rate')[0]) {
	        rate_plot = $.plot("#chart-dynamic-rate", [ getCurrentData(0, 2) ], dynamicChartSetupRate);
	    }



	    ////////////////////////////////// Get Data From Socket //////////////////////////////////
        /* Socket I/P */
		socket.on('module_data', function(response){
			if(response.data != ".")
				updateCharts(response);
		})


		self.loadLibraries = function(){
			//var data = [];

			//Libraries Needed
			$scope.$parent.loadScript('../../vendors/bower_components/salvattore/dist/salvattore.min.js', 'text/javascript', 'utf-8');
			//Flot
			//$scope.$parent.loadScript('../../demo/js/flot-charts/dynamic.js', 'text/javascript', 'utf-8');
			//$scope.$parent.loadScript('../../demo/js/flot-charts/line.js', 'text/javascript', 'utf-8');
			$scope.$parent.loadScript('../../demo/pie.js', 'text/javascript', 'utf-8');

			/* Reset Data */
			//data[0] -> Energy; data[1] -> Frequency; data[2] -> Rate 
			data = [Array.apply(null, Array(totalPoints)).map(Number.prototype.valueOf,0),
					Array.apply(null, Array(totalPoints)).map(Number.prototype.valueOf,0),
					Array.apply(null, Array(totalPoints)).map(Number.prototype.valueOf,0)
				]

			////////////////////////////////// Get Data From Socket //////////////////////////////////
	        /* Socket I/P */
			socket.on('module_data', function(response){
				if(response.data != ".")
					updateCharts(response);
			})
		}();

			

		function updateCharts(response){
			//console.log("inside update charts: ", response);
	    	/* Energy plot */
	    	if(response.unitID == "1"){
		    	energy_plot.setData([getCurrentData(response.data, 0)]);
		    	energy_plot.draw();
		    	console.log("energy plot");
		    }

	    	/* Frequency Plot */
	    	else if(response.unitID == "7"){
	    		if(response.data <= 20 || response.data >= 40){
	    			dynamicChartSetupFrequency.series.color = "#CE2761";
	    		}
	    		else{
	    			dynamicChartSetupFrequency.series.color = "#EDEFF0";
	    		}
	    		frequency_plot = $.plot("#chart-dynamic-frequency", [ getCurrentData(0, 1) ], dynamicChartSetupFrequency);

	    		//Set data after check
		    	frequency_plot.setData([getCurrentData(response.data, 1)]);
		    	frequency_plot.draw();
		    	console.log("frequency plot");
		    }

	    	/* Rate Plot */
	    	rate_plot.setData([getCurrentData((Math.floor(Math.random() * 800))+800, 2)]);
	    	rate_plot.draw();
	    }

	    function getCurrentData(currentData, mode){
	    	console.log("data before change: ", data);
	    	if(data[mode].length > 0)
	    		data[mode] = data[mode].slice(1);

	    	data[mode].push(currentData);

	    	res = [];
	    	for(var i=0; i<data[mode].length; i++)
	    		res.push([i, data[mode][i]]);

	    	console.log("data before change: ", data);
	    	return res;
	    }

	}]);


})();
