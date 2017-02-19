say2govApp.controller('addGenreCtrl',function($scope,$http,toaster,urls,$state){

	$scope.add_genre = function(genre_form){
		$http({
			url:urls.BASE_API+"/api/create-genre/",
			method:"post",
			data:$.param({'genre_name':genre_form.genre.$viewValue}),
			headers:{
				"Content-Type": 'application/x-www-form-urlencoded'
			}
		}).then(function successCallback(response){
			$scope.genre=undefined
			toaster.pop('info', "Success", "Genre Added Successfully");
		},function errorCallback(response){
			toaster.pop('error', "Error", "Something went wrong");
		})
	}

	$scope.go_back = function(){
		$state.go('base.genrelist')
	}
})