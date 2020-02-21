from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone

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

class Record(models.Model):
    user = models.ForeignKey(User, related_name='record', on_delete=models.CASCADE)
    destination = models.CharField(max_length=50, null=False, blank=False)
    start_date = models.DateField(default=timezone.now)
    end_date = models.DateField(default=timezone.now)
    comment = models.CharField(max_length=300, default='')
