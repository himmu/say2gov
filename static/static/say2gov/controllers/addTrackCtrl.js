say2govApp.controller('addTrackCtrl',function($scope,$http,$state,toaster,urls){
	$scope.addtrack_init = function(){
		$http({
			url:urls.BASE_API+'/api/genrelist',
			method:'get'
		}).then(function successCallback(response){
			$scope.genrelist = response.data

			$(".genre_list").select2({
			  tags: true,
			  tokenSeparators: [',', ' ']
			})
		})
	}

	$scope.add_track_details = function(track_detail_form){
		$scope.add_track_disable=true
		if(track_detail_form.$valid){
			$scope.gen_list = $(".genre_list").select2('data')
			$scope.genre_list = []
			
			angular.forEach($scope.gen_list,function(value){
				/*var genre_dict = {}*/
				/*genre_dict.id = value.id*/
				
				$scope.genre_list.push(value.id)
				
			})
			var post_data = {'trackname':track_detail_form.trackname.$viewValue,
			'rating':track_detail_form.rating.$viewValue,
			'genres':JSON.stringify($scope.genre_list)
		}
		$http({
		url:urls.BASE_API+"/api/add-track/",
		method:"post",
		data:$.param(post_data),
		headers:{
			"Content-Type": 'application/x-www-form-urlencoded'
		}
		}).then(function successCallback(response){
				$('.genre_list').select2('val',"")
				$scope.trackname=undefined
				$scope.rating=undefined
				$scope.genre_list=undefined

				$scope.add_track_disable=false
				toaster.pop('info', "Success", "Genre Added Successfully");
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