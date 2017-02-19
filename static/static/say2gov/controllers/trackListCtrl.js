say2govApp.controller('trackListCtrl',function($scope,$http,$state,urls,NgTableParams){
	
	$scope.tracklist_init = function(){
		$scope.getTracklist()
	}

	$scope.getTracklist = function(){
		$http({
			url:urls.BASE_API+'/api/get_all_tracks',
			method:'get'
		}).then(function successCallback(response){
			$scope.tracklist = response.data.tracklist
			/*$scope.tracklist = response.data*/
			$scope.tableParams = new NgTableParams({}, { dataset: $scope.tracklist});
			
		})
	}


	$scope.add_track = function(){
		$state.go("base.add_track")
	}

	$scope.edit_track = function(track_id){
		$state.go("base.edit_track",{'track_id':track_id})
	}




})