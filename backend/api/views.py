from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login
from rest_framework import generics, status, viewsets, permissions
from rest_framework_jwt.settings import api_settings
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from datetime import datetime

from .serializers import SignupSerializer, UserSerializer, RecordSerializer, RecordWithUserSerializer
from .permissions import IsUserManageAllowed
from .models import Record, UserProfile

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
    permission_classes = [permissions.AllowAny]
    serializer_class = SignupSerializer

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    permission_classes = [permissions.IsAuthenticated, IsUserManageAllowed]

    def get_serializer_class(self):
        if self.request.method == 'POST':
            return SignupSerializer
        return UserSerializer

    def get_queryset(self):
        return User.objects.filter(profile__role__lte=self.request.user.profile.role)

class RecordViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated]

    def get_serializer_class(self):
        if self.request.user.profile.role == UserProfile.ADMINISTRATOR:
            return RecordWithUserSerializer
        return RecordSerializer

    def get_queryset(self):
        qs = Record.objects.all()
        if self.request.user.profile.role != UserProfile.ADMINISTRATOR:
            qs = qs.filter(user=self.request.user)

        destination = self.request.query_params.get('destination', None)
        if destination is not None:
            qs = qs.filter(destination=destination)
        from_date = self.request.query_params.get('from_date', None)
        if from_date is not None:
            qs = qs.filter(start_date__gte=from_date)
        to_date = self.request.query_params.get('to_date', None)
        if to_date is not None:
            qs = qs.filter(start_date__lte=to_date)

        return qs.order_by('-start_date')

    def perform_create(self, serializer):
        record = serializer.save(user=self.request.user)
        record.save()

@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def NextMonthPlan(request):
    qs = Record.objects.all()
    if request.user.profile.role < UserProfile.ADMINISTRATOR:
        qs = qs.filter(user=request.user)

    now = datetime.now()
    nextmonth = now.replace(month=now.month + 1)
    if now.month == 12:
        nextmonth = now.replace(year=now.year + 1, month=1)
 
    records = qs.filter(start_date__year=nextmonth.year, start_date__month=nextmonth.month).all()
    serializer = RecordWithUserSerializer(records, many=True)

    return Response(serializer.data)
