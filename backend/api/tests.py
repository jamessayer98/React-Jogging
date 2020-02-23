import json
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from rest_framework.authtoken.models import Token

from django.contrib.auth.models import User
from .models import Record

class UserSignupTests(APITestCase):
    def test_create_account(self):
        url = reverse('signup')
        data = {
            'username': 'backend-test',
            'email': 'backend@test.com',
            'password': 'password'
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

class UserLoginTests(APITestCase):
    url = reverse('login')

    def setUp(self):
        url = reverse('signup')
        data = {
            'username': 'backend-test',
            'email': 'backend@test.com',
            'password': 'password'
        }
        self.client.post(url, data, format='json')

    def test_login_without_password(self):
        response = self.client.post(self.url, {"username": "backend-test"})
        self.assertEqual(400, response.status_code)

    def test_authentication_with_wrong_password(self):
        response = self.client.post(self.url, {"username": "backend-test", "password": "wrong"})
        self.assertEqual(400, response.status_code)

    def test_authentication_with_valid_data(self):
        response = self.client.post(self.url, {"username": "backend-test", "password": "password"})
        self.assertEqual(200, response.status_code)
        self.assertTrue("token" in json.loads(response.content))

class RecordTests(APITestCase):
    url = reverse('record-list')

    def setUp(self):
        self.username = "backend-test"
        self.email = "backend@test.com"
        self.password = "password"
        self.signup()
        self.login()
        self.api_authentication()

    def signup(self):
        url = reverse('signup')
        data = {
            'username': self.username,
            'email': self.email,
            'password': self.password
        }
        self.client.post(url, data, format='json')

    def login(self):
        url = reverse('login')
        response = self.client.post(url, {
            "username": self.username,
            "password": self.password
        })
        response_data = json.loads(response.content)
        self.token = response_data['token']

    def api_authentication(self):
        self.client.credentials(HTTP_AUTHORIZATION='Bearer ' + self.token)

    def test_create_plan(self):
        response = self.client.post(self.url, {
            "destination": "CDMX",
            "start_date": "2020-02-01",
            "end_date": "2020-02-29",
            "comment": "Travel to Mexico City"
        }, format="json")
        self.assertEqual(201, response.status_code)
        response = self.client.get(self.url)
        self.assertTrue(len(json.loads(response.content)) == Record.objects.count())
