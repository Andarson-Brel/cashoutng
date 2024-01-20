#!/usr/bin/python3
""" Blueprint for API """
from flask import Blueprint
from models.user import User
from models import login_manager


@login_manager.user_loader
def load_user(user_id):
    return storage.get(User, user_id)


app_views = Blueprint("app_views", __name__, url_prefix="/api")
app_auth = Blueprint("app_auth", __name__, url_prefix="/auth")

from api.views.users import *
from api.views.transactions import *
from api.views.coins import *
from api.views.exchange_rates import *
from api.views.auth import *
