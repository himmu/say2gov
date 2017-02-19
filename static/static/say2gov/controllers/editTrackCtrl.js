say2govApp.controller("editTrackCtrl",function($scope,$stateParams,toaster,$http,urls,$timeout,$state){
	$scope.edittrack_init = function(){
		/*Get genres*/
		$http({
			url:urls.BASE_API+'/api/genrelist',
			method:'get'
		}).then(function successCallback(response){
			$scope.genrelist = response.data
			// $(".genre_list").select2({
			//   tags: true,
			//   tokenSeparators: [','],
			//   multiple:true
			// })
			
			
		})


		$http({
			url:urls.BASE_API+'/api/get-track-detail/'+String($stateParams.track_id),
			method:'get'
		}).then(function successCallback(response){
			$scope.track_detail = response.data.track_detail
			$scope.trackname=$scope.track_detail.name
			$scope.rating=Number($scope.track_detail.rating)
			$scope.sel_genre=$scope.track_detail.genres
			$scope.selected_genre = []
			angular.forEach($scope.sel_genre,function(value){
				$scope.selected_genre.push(value.pk)
			});

		})
 

	}

	$scope.display = function(){
		console.log($("#genre").val())
	}
	$scope.edit_track_details = function(track_detail_form){
		var genre_list=[]
		angular.forEach($("#genre").val(),function(value){
			genre_list.push(Number(value))
		})
		$scope.add_track_disable=true
		if(track_detail_form.$valid){
			var post_data = {'title':track_detail_form.trackname.$viewValue,
			'rating':track_detail_form.rating.$viewValue,
			'genres':JSON.stringify(genre_list),
			'track_id':$stateParams.track_id
		}
		$http({
		url:urls.BASE_API+"/api/update-track/",
		method:"post",
		data:$.param(post_data),
		headers:{
			"Content-Type": 'application/x-www-form-urlencoded'
		}
		}).then(function successCallback(response){
				/*$scope.genre=undefined*/
				/*$scope.trackname=undefined
				$scope.rating=undefined*/
				$scope.add_track_disable=false
				toaster.pop('info', "Success", "Track Detail Updated Successfully");
			},function errorCallback(response){
				$scope.add_track_disable=false
				toaster.pop('error', "Error", "Something went wrong");
			})
		}

	}	

	$scope.go_back = function(){
		$state.go('base.tracklist')
	}
})