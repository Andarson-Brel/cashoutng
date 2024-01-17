#!/usr/bin/python3
""" objects that handles all default RestFul API actions for Transaction"""

from api.views import app_views
from flasgger import swag_from
from flask import abort, jsonify, make_response, request
from models.transaction import Transaction
from models.user import User
from models import storage
from uuid import uuid4


@app_views.route("/transactions", methods=["GET"], strict_slashes=True)
@swag_from("documentation/transaction/all_transactions.yml", methods=["GET"])
def get_transactions():
    """retreves a list containing all transactions in the database"""
    all_transactions = storage.all(Transaction)
    return make_response(
        jsonify([transaction.to_dict() for transaction in all_transactions], 200)
    )


@app_views.route("/<user_id>/transactions", methods=["GET"], strict_slashes=True)
@swag_from("documentation/transaction/users_transactions.yml", methods=["GET"])
def get_all_users_transactions(user_id):
    """retreves a list containing all transactions in the database"""
    user = storage.get(User, user_id)
    all_transactions = user.transactions

    return make_response(
        jsonify([transaction.to_dict() for transaction in all_transactions], 200)
    )


@app_views.route("/transaction/<transaction_id>", methods=["GET"], strict_slashes=True)
@swag_from("documentation/transaction/one_transaction.yml", methods=["GET"])
def get_one_transaction(transaction_id):
    """Returns a single transaction object for the database"""
    transaction = storage.get(Transaction, transaction_id)
    if transaction:
        return jsonify(transaction.to_dict(), 200)

    return abort(404)


@app_views.route("/transaction", methods=["POST"], strict_slashes=True)
@swag_from("documentation/transaction/post_transaction.yml", methods=["POST"])
def post_transaction():
    """create a new transaction"""
    if not request.form.to_dict():
        abort(404, description="Not a valid json")

    req = request.form.to_dict()
    instance = Transaction(**req)
    instance.id = str(uuid4())
    storage.new(instance)
    storage.save()
    return make_response(jsonify(instance.to_dict()), 201)
