'use strict';

angular.module('myApp.view1', ['ngRoute'])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  })
}])
.controller('View1Ctrl', ['$scope','$http',function($scope,$http) {
  $scope.athletes=[];
  function getAthletes () {
    console.log("here");
     $http.get('http://localhost:8000/athlete').then(function (response) {
        $scope.athletes=response.data;
      });
  }
  getAthletes ();//keeps gettin called

  

}])
.controller("ItemController",function($scope){
  $scope.myValue=false;
  $scope.myValue2=false;
  $scope.sports=[]//first empty
  $scope.addSport =function () {
    $scope.sports.push({text:$scope.formAddSportText,done:false});
    $scope.formAddSportText='';
  };
  $scope.clearCompleted = function () {
    $scope.sports = $scope.sports.filter(function(sport){
      return !sport.done;
    })
  }
 $scope.showMore=function(){
   $scope.myValue=!$scope.myValue;
  }
  $scope.EditAth=function(){
    $scope.myValue2=!$scope.myValue2;
  }
  $scope.update = function(id,athlete) {
    console.log(id);
    console.log(athlete);
    let sportslist=$scope.sports.map(function(sport){return sport.text;})
    let newsportslist=[...sportslist,athlete.sport];
    let newAthlete={...$scope.athlete,sport:newsportslist}
    $http.put(`http://localhost:8000/athlete/update/${id}`,JSON.stringify(newAthlete)).then(function (response) {
      console.log(response.data);
    });
   };
});