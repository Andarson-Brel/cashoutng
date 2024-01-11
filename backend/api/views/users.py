#!/usr/bin/python3
""" objects that handles all default RestFul API actions for User"""

from models.user import User
from api.views import app_views

from flask import abort, jsonify, make_response, request
