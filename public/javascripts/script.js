var myApp = angular.module("myApp", ["firebase"]);
myApp.controller("chatController", ["$scope", "$firebaseArray",
function($scope, $firebaseArray) {
$scope.tabs = [{
            title: 'Find a Study Spot',
            url: 'one.tpl.html'
        }, {
            title: 'Add a Study Spot',
            url: 'two.tpl.html'
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
	  var mySpot = {building:newSpot.building,floor:newSpot.floor,wifi:newSpot.wifi | 'false',cell:newSpot.cell | 'false',light:newSpot.light | 'false'};
      console.log(mySpot);
	  $scope.buildings.$add(mySpot);
	  newSpot.chat = "";
  }

  $scope.search = function(searchSpot){
		$scope.found = [];
		console.log("testing testing");
		console.log(searchSpot);
		for(var i=0;i<$scope.buildings.length;i++){
			if (searchSpot == null)
			{
				$scope.found.push($scope.buildings[i]);
			}
			else if(searchSpot.building == null || searchSpot.building == "" || $scope.buildings[i].building == searchSpot.building)
			{
				console.log("building found");
				if(searchSpot.floor == null || searchSpot.floor == "" || $scope.buildings[i].floor == searchSpot.floor)
				{
console.log("floor found");

					if($scope.buildings[i].wifi == searchSpot.wifi)
					{
console.log("wifi found");

						if($scope.buildings[i].cell == searchSpot.cell)
						{
console.log("cell found");

							if($scope.buildings[i].light == searchSpot.light)
							{
console.log("light found");

								$scope.found.push($scope.buildings[i]);
							}		
						}
					}
				}
			}
		}
	}
}
]);
