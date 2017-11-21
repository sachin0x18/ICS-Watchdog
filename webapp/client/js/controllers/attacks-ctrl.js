(function(){

	var app = angular.module('app');

	app.controller('AttacksCtrl', ['$scope', '$http', '$interval', 'socket', function($scope, $http, $interval, socket){
		var self =this;


		var my_ip = '192.168.0.21';
		var gateway1_ip = '192.168.0.20';
		var gateway2_ip = '192.168.0.30';

		var isAttack = " ";
		$scope.dataPacket = new Array();
		var dataPacketCopy = new Array();

		$scope.danger_ip = "192.168.0.66";


		/* poll Packet */
		$scope.getDataPacket = function(){
			// Socket IO  //
			socket.on('module_data', function(response) {
				console.log("\nGot response data: ", response);
				if($scope.dataPacket.length > 100)
					$scope.dataPacket.shift();
				$scope.dataPacket.push(response);
				if(response.dangerip != '.' && response.dangerip!='192.168.0.20' && response.dangerip!='192.168.0.21')
					$scope.danger_ip = response.dangerip;
				//$scope.$apply();


				console.log("inside get packet: ", response);
				$('#attackDiv').append("( " + response.ipsrc + " ) " + 
					checkIfAttack(response.dangerdata) + "  ( " + 
					response.ipdst + " ) " + " " +
					" <span style='color:steelblue'>  " + response.cmd + " </span> " + 
					response.data + "<br/>");
    			$('#attackDiv').animate({scrollTop: $('#attackDiv').prop("scrollHeight")}, 10);
			});
      	};


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
			//console.log($scope.dataPacket[$scope.dataPacket.length - 1].ipsrc + '  dst is' + $scope.dataPacket[$scope.dataPacket.length - 1].ipdst);
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
		}

		$scope.getPathColor = function(){
			//console.log("get path color is called")
			if($scope.dataPacket[$scope.dataPacket.length - 1].dangerdata == '1'){
				return("#E74C3C");
			}
			else{
				return("#1ABC9C");
			}
		}

	}]);


})();