#!/usr/bin/python3
""" Flask Application """
from api.views import app_views
from flask import Flask, jsonify, make_response


import os

app = Flask(__name__)
app.config["JSONIFY_PRETTYPRINT_REGULAR"] = True
app.register_blueprint(app_views)


@app.errorhandler(404)
def not_found(error):
    """404 Error
    ---
    responses:
      404:
        description: a resource was not found
    """
    return make_response(jsonify({"error": "Not found"}), 404)


if __name__ == "__main__":
    """Main Function"""

    app.run(host="0.0.0.0", port=5000, threaded=True)