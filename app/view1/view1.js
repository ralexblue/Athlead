'use strict';

angular.module('myApp.view1', ['ngRoute'])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  }).when("/view1/:num",{
    templateUrl: 'view1/individual.html',
  });
}])
.controller('View1Ctrl', ['$scope','$http',function($scope,$http) {
  $scope.athletes=[];

  function getAthletes () {
    console.log("here");
     $http.get('http://localhost:8000/athlete').then(function (response) {
        // this callback will be called asynchronously
        // when the response is available
        $scope.athletes=response.data;

        console.log(response.data);
      });
    console.log("new here");
  }
  getAthletes ();
 
}]);