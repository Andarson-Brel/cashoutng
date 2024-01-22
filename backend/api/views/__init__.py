#!/usr/bin/python3
""" Blueprint for API """
from flask import Blueprint

print("views next")

app_views = Blueprint("app_views", __name__, url_prefix="/api")
app_auth = Blueprint("app_auth", __name__, url_prefix="/auth")

from api.views.auth import *
from api.views.coins import *
from api.views.exchange_rates import *
from api.views.transactions import *
from api.views.users import *
