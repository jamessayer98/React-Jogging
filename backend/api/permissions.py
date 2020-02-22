from rest_framework import permissions

from .models import UserProfile

class IsUserManageAllowed(permissions.BasePermission):
    def has_permission(self, request, view):
        try:
            return request.user.profile.role >= UserProfile.USER_MANAGER
        except:
            return False
