import serializers
from rest_framework import viewsets, permissions
from rest_framework.response import Response
from rest_framework import status
from .models import *
import json

class TracksViewSet(viewsets.ModelViewSet):
    """ViewSet for the Tracks class"""

    queryset = Tracks.objects.all()
    serializer_class = serializers.TracksSerializer
    permission_classes = [permissions.AllowAny]

    def create(self,request,*args,**kwargs):
    	try:
    		# import pdb;pdb.set_trace()
    		trackname = request.POST['trackname']
    		rating = request.POST['rating']
    		genre_list = request.POST.get('genres')
    		genre_list = json.loads(genre_list)

    		tracks_obj = Tracks.objects.create(title=trackname,rating=rating)
    		for genre_id in genre_list:
    			try:
    				genre_obj = Genre.objects.get(id=genre_id)
    				TrackGenre.objects.create(fk_tracks=tracks_obj,fk_genre=genre_obj)
    			except:
    				pass
    		return Response({"message":"Track created"},status=status.HTTP_200_OK)

    	except:
    		return Response({"message":"Something went wrong"},status=status.HTTP_400_BAD_REQUEST)

    def get_all_tracks(self,request,*args,**kwargs):
    	track_obj = Tracks.objects.all().order_by('-pk')
    	track_list = []
    	for tracks in track_obj:
    		track_dict = {}
    		track_dict['id']=tracks.id
    		track_dict['title'] = tracks.title
    		track_dict['rating'] = tracks.rating
    		genre_list = []
    		genre_obj = TrackGenre.objects.filter(fk_tracks=tracks)
    		for genre in genre_obj:
    			genre_dict = {}
    			genre_dict['id']=genre.fk_genre.id
    			genre_dict['name']=genre.fk_genre.name
    			genre_list.append(genre_dict)
    		track_dict['genres'] = genre_list
    		track_list.append(track_dict)
    	return Response({"message":"Success","tracklist":track_list},status=status.HTTP_200_OK)

    def get_track_detail(self,request,*args,**kwargs):
    	try:
    		track_id = kwargs['track_id']
    		track_dict = {}
    		track_obj = Tracks.objects.get(id=track_id)
    		track_dict['name']= track_obj.title
    		track_dict['rating']= track_obj.rating
    		trackgenre_obj = TrackGenre.objects.filter(fk_tracks=track_obj)
    		genre_list = []
    		for genres in trackgenre_obj:
    			genre_dict = {}
    			genre_dict['pk'] = genres.fk_genre.id
    			genre_dict['name'] = genres.fk_genre.name
    			genre_dict['is_active'] = genres.fk_genre.is_active
    			genre_list.append(genre_dict)
    		track_dict['genres']= genre_list

    		return Response({"message":"Success","track_detail":track_dict})
    	except:
    		return Response({"message":"Something went wrong"},status=status.HTTP_400_BAD_REQUEST)

    def update(self,request,*args,**kwarsg):
    	try:
    		# import pdb;pdb.set_trace()
    		title = request.POST['title']
    		rating = request.POST['rating']
    		genres_list = request.POST['genres']
    		track_id = request.POST['track_id']
    		genres_list = json.loads(genres_list)
    		track_obj = Tracks.objects.get(id=track_id)
    		TrackGenre.objects.filter(fk_tracks=track_obj).delete()
    		track_obj.title = title
    		track_obj.rating = rating

    		for genres in genres_list:
    			try:
    				genre_obj = Genre.objects.get(id=genres)
    				TrackGenre.objects.create(fk_tracks=track_obj,fk_genre=genre_obj)
    			except:
    				pass
    		track_obj.save()
    		return Response({"message":"Success"},status=status.HTTP_200_OK)
    	except:
    		return Response({"message":"Failure"},status=status.HTTP_400_BAD_REQUEST)




class GenreViewSet(viewsets.ModelViewSet):
    """ViewSet for the Genre class"""

    queryset = Genre.objects.all()
    serializer_class = serializers.GenreSerializer
    permission_classes = [permissions.AllowAny]

    def create(self,request,*args,**kwargs):
    	try:
    		# import pdb;pdb.set_trace()
    		name = request.POST['genre_name']
    		Genre.objects.create(name=name)
    		return Response({"message":"Genre created"},status=status.HTTP_200_OK)
    	except:
    		return Response({"message":"Something went wrong"},status=status.HTTP_400_BAD_REQUEST)

    def retrieve(self,request,*args,**kwargs):
    	try:
    		genre_id = kwargs['genre_id']
    		genre_obj = Genre.objects.get(id=genre_id)
    		genre_dict = {}
    		genre_dict['id'] = genre_obj.id
    		genre_dict['name'] = genre_obj.name
    		genre_dict['is_active'] = genre_obj.is_active
    		return Response({"message":"Genre retrieve","genre_detail":genre_dict},status=status.HTTP_200_OK)
    	except:
    		return Response({"message":"Invalid genre"},status=status.HTTP_200_OK)


    def update(self,request,*args,**kwargs):
    	try:
    		genre_id = request.POST['genre_id']
    		genre_obj = Genre.objects.get(id=genre_id)
    		genre_obj.name = request.POST['name']
    		genre_obj.save()
    		return Response({"message":"Genre updated successfully"},status=status.HTTP_200_OK)
    	except:
    		return Response({"message":"Invalid request"},status=status.HTTP_400_BAD_REQUEST)


# 