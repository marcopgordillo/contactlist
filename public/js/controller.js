var myApp = angular.module('myApp', []);

myApp.controller('AppCtrl', ['$scope', '$http', function ($scope, $http) {
	//console.log("Hello world from controller");

	var deselect = function() {
		$scope.contact = "";
	};

	var refresh = function () {
		$http.get('/contactlist').success(function (response) {
			//console.log("I got the data I requested");
			$scope.contactlist = response;
			deselect();
			$scope.$invalidu = true;
		});
	};
	
	refresh();

	$scope.addContact = function () {
		//console.log($scope.contact);
		$http.post('/contactlist', $scope.contact).success(function (response) {
			//console.log(response);
			refresh();
		});
	};

	$scope.remove = function (id) {
		//console.log(id);
		$http.delete('/contactlist/'+ id).success(function (response) {
			refresh();
		});
	};

	$scope.edit = function (id) {
		//console.log(id);
		$http.get('/contactlist/'+ id).success(function (response) {
			$scope.contact = response;
		});
		$scope.$invalid = true;
		$scope.$invalidu = false;
	};

	$scope.update = function () {
		//console.log($scope.contact._id);
		$http.put('/contactlist/'+$scope.contact._id, $scope.contact).success(function (response) {
			refresh();
			deselect();		
		});
		$scope.$invalid = false;
	};	

	/*var contactlist = [
		{
			name: 'Tim',
			email: 'tim@email.com',
			number: '(111) 111-1111'
		},
		{
			name: 'Emily',
			email: 'emily@email12.com',
			number: '(222) 222-2222'
		},
		{
			name: 'John',
			email: 'john@email3.com',
			number: '(333) 333-3333'
		}
	];
	$scope.contactlist = contactlist;*/	

}]);