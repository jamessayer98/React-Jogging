from rest_framework import serializers
from django.contrib.auth.models import User
from .models import UserProfile

class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ('id', 'role')

class SignupSerializer(serializers.ModelSerializer):
    profile = UserProfileSerializer(required = False)

    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password', 'profile')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        profile_data = None
        if validated_data.get('profile') is not None:
            profile_data = validated_data.pop('profile')

        user = User(
            email = validated_data['email'],
            username = validated_data['username']
        )
        user.set_password(validated_data['password'])
        user.save()

        if profile_data is None:
            UserProfile.objects.create(user=user, role=UserProfile.REGULAR_USER)
        else:
            UserProfile.objects.create(user=user, **profile_data)
        return user
