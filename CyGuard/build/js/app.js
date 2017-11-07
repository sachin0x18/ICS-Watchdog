(function(){
	var app = angular.module('IcsSecurity', []);

	var my_ip = '192.168.0.21';
	var gateway1_ip = '192.168.0.20';
	var gateway2_ip = '192.168.0.30';

	app.controller('IcsController', ['$scope', '$http', '$interval', function($scope, $http, $interval){
		var isAttack = " ";
		$scope.dataPacket = new Array();
		var dataPacketCopy = new Array();
		
		var socket = io.connect('http://127.0.0.1:3000');
		socket.on('connect', function(data) {
			socket.emit('module_data', 'Hello World from client');
		});

		
		$scope.danger_ip = "192.168.0.66";
		$scope.getDataPacket = function(){
			// Socket IO  //
			socket.on('module_data', function(response) {
				console.log("\nGot response data: ", response);
				if($scope.dataPacket.length > 100)
					$scope.dataPacket.shift();
				$scope.dataPacket.push(response);
				if(response.dangerip != '.' && response.dangerip!='192.168.0.20' && response.dangerip!='192.168.0.21')
					$scope.danger_ip = response.dangerip;
				$scope.$apply();
				$('#attackDiv').append("( " + response.ipsrc + " ) " + 
					checkIfAttack(response.dangerdata) + "  ( " + 
					response.ipdst + " ) " + " " +
					" <span style='color:steelblue'>  " + response.cmd + " </span> " + 
					response.data + "<br/>");
            			$('#attackDiv').animate({scrollTop: $('#attackDiv').prop("scrollHeight")}, 10);
			});
          	};

		/*$scope.getDataPacket = function(){
			
			$http.get('https://dweet.io/get/latest/dweet/for/netdata').then(function(response){
				console.log("sent get request ", response.data.with[0].content);
				$scope.dataPacket.push(response.data.with[0].content);
				console.log($scope.dataPacket);
				dataPacketCopy = $scope.dataPacket;

				$('#attackDiv').append("( " + response.data.with[0].content.ipsrc + " ) " + 
					checkIfAttack(response.data.with[0].content.dangerdata) + "  ( " + 
					response.data.with[0].content.ipdst + " ) " + " " +
					" <span style='color:steelblue'>  " + response.data.with[0].content.cmd + " </span> " + 
					response.data.with[0].content.data + "<br/>");
		    	$('#attackDiv').animate({scrollTop: $('#attackDiv').prop("scrollHeight")}, 500);
		  		console.log("before setTimeout");
		  	});
		  	//$scope.$apply();
		 };*/

		 //$interval($scope.getDataPacket, 1200);

		 $scope.temp = function(){
		 	setTimeout(function(){
		 		getDataPacket();	
		 	}, 2000);
		 };

		var checkIfAttack = function(isAttack){
			if(isAttack == '0'){
				return(" <span style='color:green'>sends to</span> ");
			}
			else{
				return(" <span style='color:red'>attacks</span> ");
			}
		}

		$scope.networkPath = function(){
			console.log($scope.dataPacket[$scope.dataPacket.length - 1].ipsrc + '  dst is' + $scope.dataPacket[$scope.dataPacket.length - 1].ipdst);
			if((($scope.dataPacket[$scope.dataPacket.length - 1].ipsrc == my_ip) || ($scope.dataPacket[$scope.dataPacket.length - 1].ipsrc == gateway1_ip))  &&  
				(($scope.dataPacket[$scope.dataPacket.length - 1].ipdst == my_ip) || ($scope.dataPacket[$scope.dataPacket.length - 1].ipdst == gateway1_ip)) ){
				console.log("network path returning 1");
				return(1);
			}
			else if(($scope.dataPacket[$scope.dataPacket.length - 1].ipsrc == $scope.danger_ip) || ($scope.dataPacket[$scope.dataPacket.length - 1].ipdst == $scope.danger_ip) ){
				console.log("network path returning 3");
				return(3);
			}
			else if((($scope.dataPacket[$scope.dataPacket.length - 1].ipsrc == my_ip) || ($scope.dataPacket[$scope.dataPacket.length - 1].ipsrc == gateway2_ip))  &&  
				(($scope.dataPacket[$scope.dataPacket.length - 1].ipdst == my_ip) || ($scope.dataPacket[$scope.dataPacket.length - 1].ipdst == gateway2_ip)) ){
				console.log("network path returning 2");
				return(2);
			}

			else {
				console.log("esle condition");
				console.log("network path returning 0");
				return(0);
			}
		}

		$scope.unitIdPath = function(){
			var lastDataPacketID = $scope.dataPacket[$scope.dataPacket.length - 1].unitID;
			if(lastDataPacketID == "1"){
                return(1);
            }
            else if(lastDataPacketID == "7"){
                return(7);
            }
            else{
                return(7);
            }
			//return(7);
		}


		$scope.getPathColor = function(){
			console.log("get path color is called")
			if($scope.dataPacket[$scope.dataPacket.length - 1].dangerdata == '1'){
				return("#E74C3C");
			}
			else{
				return("#1ABC9C");
			}
		}
         /*$scope.temp = function(){
         	setTimeout(function(){
         		getDataPacket();	
         	}, 1000);
         }*/
		//$http.get('/ url').success(function(data){
		//	$scope.dataPacket.push(data);
		//});
	}]);

})();
