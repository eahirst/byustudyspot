var myApp = angular.module("myApp", ["firebase"]);
myApp.controller("chatController", ["$scope", "$firebaseArray",
function($scope, $firebaseArray) {
$scope.tabs = [{
            title: 'Find a Study Spot',
            url: 'one.tpl.html'
        }, {
            title: 'Add a Study Spot',
            url: 'two.tpl.html'
        }, {
            title: 'Login',
            url: 'three.tpl.html'
    }];
 $scope.currentTab = 'one.tpl.html';

    $scope.onClickTab = function (tab) {
        $scope.currentTab = tab.url;
    }
    
    $scope.isActiveTab = function(tabUrl) {
        return tabUrl == $scope.currentTab;
    }
  var ref = new Firebase("https://study-spot-finder.firebaseio.com/");
  $scope.buildings = $firebaseArray(ref);
  $scope.update = function(newSpot) {
	  var mySpot = {from:newSpot.name || "",building:newSpot.building,floor:newSpot.floor,wifi:newSpot.wifi,cell:newSpot.cell,light:newSpot.light};
      console.log(mySpot);
	  $scope.buildings.$add(mySpot);
	  newSpot.chat = "";
  }
}
]);