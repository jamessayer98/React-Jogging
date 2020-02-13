from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class UserProfile(models.Model):
    REGULAR_USER = 0
    USER_MANAGER = 1
    ADMINISTRATOR = 2

    user = models.OneToOneField(User, related_name='profile', on_delete=models.CASCADE)
    roles = (
        (REGULAR_USER, 'Regular User'),
        (USER_MANAGER, 'User Manager'),
        (ADMINISTRATOR, 'Administrator')
    )
    role = models.IntegerField(choices=roles, default=0)
