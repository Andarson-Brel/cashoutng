#!/usr/bin/python3
""" objects that handles all default RestFul API actions for User"""

from api.views import app_views
from flasgger import swag_from
from flask import abort, jsonify, make_response, request
from models.user import User
from uuid import uuid4
from models import storage


@app_views.route("/users", methods=["GET"], strict_slashes=True)
@swag_from("documentation/user/all_users.yml", methods=["GET"])
def get_users():
    """retreves a list containing all users in the database"""
    all_users = storage.all(User)
    return make_response(jsonify([user.to_dict() for user in all_users], 200))


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
    return make_response(jsonify({}), 200)


@app_views.route("/user", methods=["POST"], strict_slashes=True)
@swag_from("documentation/user/post_user.yml", methods=["POST"])
def post_user():
    """create a new user"""
    print(request.form.to_dict())
    if not request.form.to_dict():
        abort(404, description="Not a valid json")

    req = request.form.to_dict()
    if "email" not in req:
        abort(400, description="Missing email")
    if "password_hash" not in req:
        abort(400, description="Missing password")

    instance = User(**req)
    instance.id = str(uuid4())
    storage.new(instance)
    storage.save()
    return make_response(jsonify(instance.to_dict()), 201)


@app_views.route("/user/<user_id>", methods=["PUT"], strict_slashes=True)
@swag_from("documentation/user/put_user.yml", methods=["PUT"])
def put_user(user_id):
    """Update user information for the given user"""
    user = storage.get(User, user_id)
    if not user:
        abort(404)

    if not request.form.to_dict():
        abort(404, description="Invalid JSON")

    data = request.form.to_dict()
    for key, val in data.items():
        setattr(user, key, val)
    storage.save()
    return make_response(jsonify({}), 200)