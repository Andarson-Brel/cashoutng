#!/usr/bin/python3
""" objects that handles all default RestFul API actions for coin"""

from api.views import app_views
from flasgger import swag_from
from flask import abort, jsonify, make_response, request
from models.coin import Coin
from uuid import uuid4
from models import storage


@app_views.route("/coins", methods=["GET"], strict_slashes=True)
@swag_from("documentation/coin/all_coins.yml", methods=["GET"])
def get_coins():
    """retreves a list containing all coins in the database"""
    all_coins = storage.all(Coin)
    return make_response(jsonify([coin.to_dict() for coin in all_coins], 200))


@app_views.route("/coin/<coin_id>", methods=["GET"], strict_slashes=True)
@swag_from("documentation/coin/one_coin.yml", methods=["GET"])
def get_one_coin(coin_id):
    """Returns a single coin object for the database"""
    coin = storage.get(Coin, coin_id)
    if coin:
        return jsonify(coin.to_dict(), 200)

    return abort(404)


@app_views.route("/coin/<coin_id>", methods=["DELETE"], strict_slashes=True)
@swag_from("documentation/coin/delete_coin.yml", methods=["DELETE"])
def delete_coin(coin_id):
    """delete coin from the database"""
    coin = storage.get(Coin, coin_id)
    if not coin:
        abort(404)

    storage.delete(coin)
    storage.save()
    return make_response(jsonify({}), 200)


@app_views.route("/coin", methods=["POST"], strict_slashes=True)
@swag_from("documentation/coin/post_coin.yml", methods=["POST"])
def post_coin():
    """create a new coin"""
    if not request.form.to_dict():
        abort(404, description="Not a valid json")

    req = request.form.to_dict()

    instance = Coin(**req)
    instance.id = str(uuid4())

    storage.new(instance)
    storage.save()
    return make_response(jsonify(instance.to_dict()), 201)


@app_views.route("/coin/<coin_id>", methods=["PUT"], strict_slashes=True)
@swag_from("documentation/coin/put_coin.yml", methods=["PUT"])
def put_coin(coin_id):
    """Update coin information for the given coin"""
    coin = storage.get(Coin, coin_id)
    if not coin:
        abort(404)

    if not request.form.to_dict():
        abort(404, description="Invalid JSON")

    data = request.form.to_dict()
    for key, val in data.items():
        setattr(coin, key, val)
    storage.save()
    return make_response(jsonify({}), 200)