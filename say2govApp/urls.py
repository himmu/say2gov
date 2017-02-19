
from django.conf.urls import include, url
from django.contrib import admin
from say2govApp.models import *
from views import *
from django.views.decorators.csrf import csrf_exempt

urlpatterns = [
    url(r'^get_all_tracks$',csrf_exempt(TracksViewSet.as_view({'get': 'get_all_tracks'})),name='track_list'),
    url(r'^add-track/$',csrf_exempt(TracksViewSet.as_view({'post': 'create'})),name='add_track'),
    url(r'^get-track-detail/(?P<track_id>.+)$',csrf_exempt(TracksViewSet.as_view({'get': 'get_track_detail'})),name='get_track_detail'),
    url(r'^update-track/$',csrf_exempt(TracksViewSet.as_view({'post': 'update'})),name='update_track'),
    
    url(r'^genrelist$',csrf_exempt(GenreViewSet.as_view({'get': 'list'})),name='genre_list'),
    url(r'^create-genre/$',csrf_exempt(GenreViewSet.as_view({'post': 'create'})),name='create_genre'),
    url(r'^get-single-genre/(?P<genre_id>.+)$',csrf_exempt(GenreViewSet.as_view({'get': 'retrieve'})),name='get_single_genre'),
    url(r'^update-genre/$',csrf_exempt(GenreViewSet.as_view({'post': 'update'})),name='update_genre'),



]
