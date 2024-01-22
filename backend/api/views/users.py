#!/usr/bin/python3
""" objects that handles all default RestFul API actions for User"""


from api.views import app_views
from flasgger import swag_from
from flask import abort, jsonify, request
from helpers.object import check_keys
from models import storage
from models.user import User


@app_views.route("/users", methods=["GET"], strict_slashes=True)
@swag_from("documentation/user/all_users.yml", methods=["GET"])
def get_users():
    """retreves a list containing all users in the database"""
    all_users = storage.all(User)
    return jsonify([user.to_dict() for user in all_users], 200)


@app_views.route("/user/<user_id>", methods=["GET"], strict_slashes=True)
@swag_from("documentation/user/one_user.yml", methods=["GET"])
def get_one_user(user_id):
    """Returns a single user object for the database"""
    user = storage.get(User, user_id)
    if user:
        return jsonify(user.to_dict(), 200)

    return abort(404)


@app_views.route("/user/<user_id>", methods=["DELETE"], strict_slashes=True)
@swag_from("documentation/user/delete_user.yml", methods=["DELETE"])
def delete_user(user_id):
    """delete user from the database"""
    user = storage.get(User, user_id)
    if not user:
        abort(404)

    storage.delete(user)
    storage.save()
    return jsonify({}), 200


@app_views.route("/user/<user_id>", methods=["PUT"], strict_slashes=True)
@swag_from("documentation/user/put_user.yml", methods=["PUT"])
def put_user(user_id):
    """Update user information for the given user"""
    user = storage.get(User, user_id)
    if not user:
        abort(404)

    if not request.get_json():
        abort(404, description="Invalid JSON")

    data = request.get_json()
    data = check_keys(
        data,
        [
            "email",
            "password",
            "firstName",
            "lastName",
            "username",
            "bank",
            "accountName",
            "accountNumber",
            "isAdmin",
        ],
    )
    if "isAdmin" in data:
        data["isAdmin"] = bool(int(data["isAdmin"]))
    for key, val in data.items():
        setattr(user, key, val)
    storage.save()
    return jsonify({}), 200
