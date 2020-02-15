from rest_framework import serializers
from django.contrib.auth.models import User
from .models import UserProfile, Record


class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ('id', 'role')

class SignupSerializer(serializers.ModelSerializer):
    profile = UserProfileSerializer(required = False)

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password', 'profile']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User(
            email = validated_data['email'],
            username = validated_data['username']
        )
        user.set_password(validated_data['password'])
        user.save()

        UserProfile.objects.create(user=user, role=UserProfile.REGULAR_USER)

        return user

class UserSerializer(serializers.ModelSerializer):
    profile = UserProfileSerializer(required=False)

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'profile']

    def to_internal_value(self, data):
        role = data.get('role', None)
        parsed_data = super().to_internal_value(data)

        if role is not None:
            parsed_data['role'] = int(role)

        return parsed_data

    def create(self, validated_data):
        role = validated_data.pop('role', UserProfile.REGULAR_USER)
        user = User.objects.create(**validated_data)

        if role is not None:
            UserProfile.objects.create(user=user, role=role)
        
        return user

    def update(self, instance, validated_data):
        instance.username = validated_data.get('username', instance.username)
        instance.email = validated_data.get('email', instance.email)
        instance.save()

        if validated_data.get('role') is not None:
            instance.profile.role = validated_data['role']
            instance.profile.save()

        return instance

class RecordSerializer(serializers.ModelSerializer):
    user = UserSerializer(required=False)

    class Meta:
        model = Record
        fields = ['id', 'destination', 'start_date', 'end_date', 'comment', 'user']

class RecordWithUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = Record
        fields = ['id', 'destination', 'start_date', 'end_date', 'comment']
