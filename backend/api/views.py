from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login
from rest_framework import generics, status, viewsets, permissions
from rest_framework_jwt.settings import api_settings
from rest_framework.response import Response

from .serializers import SignupSerializer, UserSerializer
from .permissions import IsUserManageAllowed

# Get the JWT settings
jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER

class LoginView(generics.CreateAPIView):
    permission_classes = ()
    queryset = User.objects.all()

    def post(self, request, *args, **kwargs):
        username = request.data.get("username", "")
        password = request.data.get("password", "")
        user = authenticate(request, username=username, password=password)

        if user is not None:
            # login to save the user's ID in the session
            login(request, user)

            return Response(data = {
                "token": jwt_encode_handler(
                    jwt_payload_handler(user)
                ),
                "id": user.id,
                "username": user.username,
                "email": user.email,
                "role": user.profile.role
            })

        return Response(status=status.HTTP_401_UNAUTHORIZED)

class SignupView(generics.CreateAPIView):
    permission_classes = ()
    serializer_class = SignupSerializer

class UserViewSet(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    queryset = User.objects.all()
    permission_classes = [permissions.IsAuthenticated, IsUserManageAllowed]
