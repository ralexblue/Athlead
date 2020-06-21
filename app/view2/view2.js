'use strict';

angular.module('myApp.view2', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view2', {
    templateUrl: 'view2/view2.html',
    controller: 'View2Ctrl'
  });
}])

.controller('View2Ctrl', ['$scope','$http',function($scope,$http)  {
   //Form Data
   $scope.sports=[]//first empty
   $scope.addSport =function () {
     $scope.sports.push({text:$scope.formAddSportText,done:false});
     $scope.formAddSportText='';
   };
   $scope.clearCompleted = function () {
     console.log("erasing");
     $scope.sports = $scope.sports.filter(function(sport){
       console.log(sport)
       return !sport.done;
     })
   }
 //sports data
   $scope.master = {};
   $scope.update = function(athlete) {
    $scope.master = angular.copy(athlete);
    let sportslist=$scope.sports.map(function(sport){return sport.text;})
    let newAthlete={...$scope.athlete,sport:sportslist}
    $http.post('http://localhost:8000/athlete/add',JSON.stringify(newAthlete)).then(function (response) {
      console.log(response.data);
    });
   };
   $scope.checkSport= function(){
    let sportslist=$scope.sports.map(function(sport){return sport.text});
    let newAthlete={...$scope.athlete,sport:sportslist}
    console.log("ok");
    console.log(sportslist);
    console.log(newAthlete);
   }
 
   $scope.reset = function(form) {
     if (form) {
       form.$setPristine();
       form.$setUntouched();
     }
     $scope.athlete = angular.copy($scope.master);
     $scope.athlete={};
     
   };
 
   $scope.reset();
 
}]);