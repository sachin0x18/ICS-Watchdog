(function(){
	var app = angular.module('app');

	app.controller('MainCtrl', ['$scope', '$http', '$interval', 'socket', function($scope, $http, $interval, socket){
		$scope.temp = "yo";



		$scope.loadScript = function(url, type, charset) {
		    if (type===undefined) type = 'text/javascript';
		    if (url) {
		        var script = document.querySelector("script[src*='"+url+"']");
		        if (!script) {
		            var heads = document.getElementsByTagName("head");
		            if (heads && heads.length) {
		                var head = heads[0];
		                if (head) {
		                    script = document.createElement('script');
		                    script.setAttribute('src', url);
		                    script.setAttribute('type', type);
		                    if (charset) script.setAttribute('charset', charset);
		                    head.appendChild(script);
		                }
		            }
		        }
		        return script;
		    }
		};



	}]);

})();