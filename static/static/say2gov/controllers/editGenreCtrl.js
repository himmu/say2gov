
say2govApp.controller('editGenreCtrl',function($scope,$http,toaster,$stateParams,urls,$state){
	$scope.editgenre_init = function(){

		$http({
			url:'/api/get-single-genre/'+String($stateParams.genre_id),
			method:'get'
		}).then(function successCallback(response){
			$scope.genre = response.data.genre_detail.name
			$scope.genre_id = response.data.genre_detail.id
			
		})
	}
	

	$scope.update_genre = function(genre_form){
		$http({
			url:urls.BASE_API+"/api/update-genre/",
			method:"post",
			data:$.param({'name':genre_form.genre.$viewValue,'genre_id':$scope.genre_id}),
			headers:{
				"Content-Type": 'application/x-www-form-urlencoded'
			}
		}).then(function successCallback(response){
			
			toaster.pop('info', "Success", "Genre Updated Successfully");
		},function errorCallback(response){
			toaster.pop('error', "Error", "Something went wrong");
		})
	}

	$scope.go_back = function(){
		$state.go('base.genrelist')
	}
})