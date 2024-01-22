#!/usr/bin/python3
""" Flask Application """
# stay
from api.views import app_auth, app_views
from flasgger import Swagger
from flask import jsonify, make_response
from models import app, storage

print("run third")

import os

app.config["JSONIFY_PRETTYPRINT_REGULAR"] = True
app.config["UPLOAD_FOLDER"] = "images"
app.register_blueprint(app_views)
app.register_blueprint(app_auth)

with app.app_context():
    storage.create_all()


@app.errorhandler(404)
def not_found(error):
    """404 Error
    ---
    responses:
      404:
        description: a resource was not found
    """
    return make_response(jsonify({"error": "Not found"}), 404)


app.config["SWAGGER"] = {"title": "CashoutNG backend api", "uiversion": 1}

Swagger(app)
if __name__ == "__main__":
    """Main Function"""
    app.run(host="0.0.0.0", port=5000, threaded=True, debug=True)
