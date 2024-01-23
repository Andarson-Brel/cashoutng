#!/usr/bin/python3
""" objects that handles all default RestFul API actions for exchange_rate"""

from uuid import uuid4

from api.views import app_views
from flasgger import swag_from
from flask import abort, jsonify, request
from helpers.object import check_keys, validate_object
from models import storage
from models.exchange_rate import ExchangeRate


@app_views.route("/exchange_rate", methods=["GET"], strict_slashes=True)
@swag_from("documentation/exchange_rate/exchange_rate.yml", methods=["GET"])
def latest_exchange_rate():
    """Returns a single exchange_rate object for the database"""
    rate = storage.all(ExchangeRate)
    if rate:
        return jsonify(rate[0].to_dict()), 200

    return abort(404)


@app_views.route("/exchange_rate", methods=["POST"], strict_slashes=True)
@swag_from("documentation/exchange_rate/exchange_rate.yml", methods=["POST"])
def post_exchange_rate():
    """create a new exchange_rate"""
    if not request.get_json():
        abort(404, description="Not a valid json")

    req = request.get_json()
    req = check_keys(req, ["rate"])
    validate_object(req, ["rate"])

    instance = ExchangeRate(**req)
    instance.id = str(uuid4())

    storage.new(instance)
    storage.save()
    return jsonify(instance.to_dict()), 201


@app_views.route(
    "/exchange_rate/<exchange_rate_id>", methods=["PUT"], strict_slashes=True
)
@swag_from("documentation/exchange_rate/put_exchange_rate.yml", methods=["PUT"])
def put_exchange_rate(exchange_rate_id):
    """Update exchange_rate information for the given exchange_rate"""
    rate = storage.get(ExchangeRate, exchange_rate_id)
    if not rate:
        abort(404)

    if not request.get_json():
        abort(404, description="Invalid JSON")

    data = request.get_json()
    data = check_keys(data, ["rate"])
    for key, val in data.items():
        setattr(rate, key, val)
    storage.save()
    return jsonify({}), 200
