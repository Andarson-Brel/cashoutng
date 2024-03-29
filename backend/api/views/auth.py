#!/usr/bin/python3
""" objects that handles all default RestFul API authentication  features"""

from uuid import uuid4

from api.views import app_auth
from flasgger import swag_from
from flask import abort, jsonify, request, session
from flask_login import current_user, login_required, login_user, logout_user
from helpers.object import check_keys, validate_object
from models import login_manager, storage
from models.user import AnnonymosUser, User
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
            "isAdmin",
            "isValidated",
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

    storage.new(instance)
    storage.save()
    uss = storage.get(User, instance.id)
    # session["user_id"] = uss.id
    if current_user.is_authenticated:
        logout_user()
    login_user(uss)
    # print(storage.get(User, session["user_id"]))
    print("=================current user ====================")
    # print(current_user)
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
    user = storage.get_email(User, req["email"])
    if not user:
        abort(404)
    if check_password_hash(user.password, req["password"]):
        if current_user.is_authenticated:
            print("user is authenticated")
            logout_user()
        # session["user_id"] = user.id

        login_user(user)
        print(current_user)
        print("=========================================")
        # print(current_user)
        return jsonify({"message": "log in successfull"}), 200
    else:
        return jsonify({"message": "password is incorrect"}), 404


@app_auth.route("/logout", methods=["GET"])
def signout_user():
    """logout a user"""
    print("====================== loggin out user =================")
    # key = session.pop("user_id", None)
    key = logout_user()
    # session.clear()
    login_user(AnnonymosUser())
    print(current_user)
    print("==========keyyyy============")
    if key:
        return jsonify({"message": "logged out successfully"})
    else:
        abort(404)


@app_auth.route("/current_user", methods=["GET"])
def get_current_user():
    """get current loggrd in user"""
    print("=================== get current user =================")
    # current_user = storage.get(User, session.get("user_id"))
    if current_user.is_authenticated:
        print(current_user.to_dict())
        return jsonify(current_user.to_dict()), 200
    else:
        return jsonify({"message": "not found"}), 404
