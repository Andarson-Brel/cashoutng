#!/usr/bin/python3
""" objects that handles all default RestFul API actions for Transaction"""

from uuid import uuid4

from api.views import app_views
from flasgger import swag_from
from flask import abort, jsonify, make_response, request
from helpers.object import check_keys, validate_object
from models import storage
from models.transaction import Transaction
from models.user import User


@app_views.route("/transactions", methods=["GET"], strict_slashes=True)
@swag_from("documentation/transaction/all_transactions.yml", methods=["GET"])
def get_transactions():
    """retreves a list containing all transactions in the database"""
    all_transactions = storage.all(Transaction)

    all_t = []
    for tran in all_transactions:
        transaction = tran.to_dict()
        transaction["user"] = tran.user.to_dict()
        transaction["coin"] = tran.coin.to_dict()
        del transaction["coinId"]
        del transaction["userId"]
        all_t.append(transaction)
    return jsonify(all_t), 200


@app_views.route("/<user_id>/transactions", methods=["GET"], strict_slashes=True)
@swag_from("documentation/transaction/users_transactions.yml", methods=["GET"])
def get_all_users_transactions(user_id):
    """retreves a list containing all transactions in the database"""
    user = storage.get(User, user_id)
    if not user:
        abort(404)
    all_transactions = user.transactions
    all_t = []
    for tran in all_transactions:
        transaction = tran.to_dict()
        transaction["coin"] = tran.coin.to_dict()
        del transaction["coinId"]
        all_t.append(transaction)

    return jsonify(all_t), 200


@app_views.route("/transaction/<transaction_id>", methods=["GET"], strict_slashes=True)
@swag_from("documentation/transaction/one_transaction.yml", methods=["GET"])
def get_one_transaction(transaction_id):
    """Returns a single transaction object for the database"""
    transaction = storage.get(Transaction, transaction_id)
    if transaction:
        tran: dict = transaction.to_dict()
        tran["user"] = transaction.user.to_dict()
        tran["coin"] = transaction.coin.to_dict()
        del tran["coinId"]
        del tran["userId"]
        return jsonify(tran), 200

    return abort(404)


@app_views.route("/transaction", methods=["POST"], strict_slashes=True)
@swag_from("documentation/transaction/post_transaction.yml", methods=["POST"])
def post_transaction():
    """create a new transaction"""
    if not request.get_json():
        abort(404, description="Not a valid json")

    req = request.get_json()
    req = check_keys(
        req,
        [
            "status",
            "quantity",
            "valueUsd",
            "valueInNaira",
            "userId",
            "coinId",
            "imgUrl",
        ],
    )
    validate_object(
        req,
        ["quantity", "valueUsd", "valueInNaira", "userId", "coinId"],
    )
    instance = Transaction(**req)
    instance.id = str(uuid4())
    storage.new(instance)
    storage.save()
    return jsonify(instance.to_dict()), 201


@app_views.route("/transaction/<transaction_id>", methods=["PUT"], strict_slashes=True)
@swag_from("documentation/transaction/put_transaction.yml", methods=["PUT"])
def put_transaction(transaction_id):
    """Update transaction information for the given transaction"""
    transaction = storage.get(Transaction, transaction_id)
    if not transaction:
        abort(404)

    if not request.get_json():
        abort(404, description="Invalid JSON")

    data = request.get_json()
    data = check_keys(
        data,
        [
            "status",
            "quantity",
            "valueUsd",
            "valueInNaira",
            "userName",
            "coinName",
            "userId",
            "imgUrl",
        ],
    )
    for key, val in data.items():
        setattr(transaction, key, val)
    storage.save()
    return jsonify({}), 200
