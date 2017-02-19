say2govApp.controller('genreListCtrl',function($scope,$http,$state,urls,NgTableParams){

	$scope.genrelist_init = function(){
		$scope.getGenre()
	}

	$scope.get_genrelist_by_pagination = function(urls){
		$http({
			url: urls,
			method:'get'
		}).then(function successCallback(response){
			$scope.tracklist = response.data.results
			$scope.next_page = response.data.next
			$scope.previous_page = response.data.previous
			
		})
	}


	$scope.getGenre = function(){
		$http({
			url:urls.BASE_API+'/api/genrelist',
			method:'get'
		}).then(function successCallback(response){
			$scope.tracklist = response.data
			$scope.tableParams = new NgTableParams({}, { dataset: $scope.tracklist});
		})
	}




	$scope.edit_genre = function(genre_id){
		$state.go('base.editgenre',{'genre_id':genre_id})
	}

	$scope.add_track = function(){
		$state.go("base.addgenre")
	}
})