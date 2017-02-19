from django.db import models

# Create your models here.

class Tracks(models.Model):
	title = models.CharField(max_length=500,null=False,blank=False)
	rating = models.CharField(max_length=3,null=True,blank=True)
	is_active = models.BooleanField(default=True)

class Genre(models.Model):
	name = models.CharField(max_length=100,null=False,blank=False)
	is_active = models.BooleanField(default=True)

class TrackGenre(models.Model):
	fk_tracks = models.ForeignKey('Tracks',null=False,blank=False)
	fk_genre = models.ForeignKey('Genre',null=False,blank=False)


