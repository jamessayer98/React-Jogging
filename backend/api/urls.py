from django.urls import include, path, re_path
from rest_framework import routers
from .views import LoginView, SignupView, UserViewSet, RecordViewSet

router = routers.DefaultRouter()

router.register(r'user', UserViewSet, basename="user")
router.register(r'record', RecordViewSet, basename="record")

urlpatterns = [
    path('login/', LoginView.as_view(), name="login"),
    path('signup/', SignupView.as_view(), name="signup"),
    re_path(r'^', include(router.urls))
]
