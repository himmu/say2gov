import models
from rest_framework import serializers

class TracksSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.Tracks
        fields = (
            'pk', 
            'title', 
            'rating', 
            'is_active', 
        )


class GenreSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.Genre
        fields = (
            'pk', 
            'name', 
            'is_active', 
        )

