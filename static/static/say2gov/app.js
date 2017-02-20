var say2govApp = angular.module('say2gov',['ui.router','ngMessages','ngTable','toaster','ngAnimate','angular-loading-bar','angular-rating'])


say2govApp.constant('urls',{
    'BASE_API':"https://say2gov.herokuapp.com",
    "MEDIA_URL":"https://say2gov.herokuapp.com/"
})

.config(function ($interpolateProvider) {
    $interpolateProvider.startSymbol('{$');
    $interpolateProvider.endSymbol('$}');
})


.config(function($stateProvider,$locationProvider,$urlRouterProvider,$httpProvider) {
        $stateProvider

        	.state('base',{
        		templateUrl:'/static/say2gov/partials/base.html',
        		Abstract:true,
                /*controller:'headerCtrl'*/
        	})
            .state('base.tracklist', {
                url: '',
                templateUrl: '/static/say2gov/partials/trackList.html',
                controller: 'trackListCtrl',
            })

           /* .state('base.tracklist', {
                url: '/tracklist',
                templateUrl: '/static/say2gov/partials/trackList.html',
                controller: 'trackListCtrl',
            })*/

            .state('base.add_track', {
                url: '/add-track',
                templateUrl: '/static/say2gov/partials/addTrack.html',
                controller: 'addTrackCtrl',
            })

            .state('base.edit_track', {
                url: '/edit-track/{track_id}',
                templateUrl: '/static/say2gov/partials/editTrack.html',
                controller: 'editTrackCtrl',
                params:{
                	'track_id':null
                }
            })



            .state('base.genrelist', {
                url: '/genrelist',
                templateUrl: '/static/say2gov/partials/genreList.html',
                controller: 'genreListCtrl',
            })

            .state('base.addgenre', {
                url: '/add-genre',
                templateUrl: '/static/say2gov/partials/addGenre.html',
                controller: 'addGenreCtrl',
            })

            .state('base.editgenre', {
                url: '/edit-genre/{genre_id}',
                templateUrl: '/static/say2gov/partials/editGenre.html',
                controller: 'editGenreCtrl',
                params:{
                	'genre_id':null
                }
            })



            

/*
            $urlRouterProvider.otherwise('login')*/



    });

