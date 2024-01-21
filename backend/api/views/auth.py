#!/usr/bin/python3
""" objects that handles all default RestFul API authentication  features"""

from uuid import uuid4

from api.views import app_auth
from flasgger import swag_from
from flask import abort, jsonify, make_response, request
from flask_login import LoginManager, current_user, login_user, logout_user
from helpers.object import check_keys, validate_object
from models import app, login_manager, storage
from models.user import User
from werkzeug.security import check_password_hash, generate_password_hash


@app_auth.route("/signup", methods=["POST"])
@swag_from("documentation/user/signup_user.yml", methods=["POST"])
def signup_user():
    """create a new user"""
    if not request.get_json():
        abort(404, description="Not a valid json")

    req = request.get_json()
    req = check_keys(
        req,
        [
            "email",
            "password",
            "firstName",
            "lastName",
            "username",
            "bank",
            "accountName",
            "accountNumber",
            "phoneNumber",
        ],
    )
    validate_object(
        req,
        [
            "email",
            "password",
            "firstName",
            "lastName",
            "username",
            "bank",
            "accountName",
            "accountNumber",
            "phoneNumber",
        ],
    )
    user = storage.get_email(User, req["email"])
    if user:
        return jsonify({"message": "this user already exists"}), 300
    if "isAdmin" in req:
        req["isAdmin"] = bool(int(req["isAdmin"]))
    password = generate_password_hash(req["password"])
    req["password"] = password
    instance = User(**req)
    instance.id = str(uuid4())
    login_user(instance)
    storage.new(instance)
    storage.save()
    return jsonify({"message": "user created successfully"}), 201


@app_auth.route("/login", methods=["POST"])
def signin_user():
    """login a user"""
    if not request.get_json():
        abort(404, description="Not A Valid JSON")

    data = request.get_json()
    req = check_keys(
        data,
        [
            "email",
            "password",
        ],
    )
    validate_object(
        req,
        [
            "email",
            "password",
        ],
    )
    user = storage.get_email(req["email"])
    if not user:
        abort(404)
    if check_password_hash(user.password, req["password"]):
        login_user(user)
        return jsonify({"message": "user logged in successfully"})
    else:
        return jsonify({"message": "password is incorrect"}), 404


@app_auth.route("/logout", methods=["POST"])
def signout_user():
    """logout a user"""

    if current_user.is_authenticated():
        logout_user()
