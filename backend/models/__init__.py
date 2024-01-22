import os

from flask import Flask
from flask_cors import CORS

from models.engine.storage import Storage

# from models.engine.storage import Storage


app = Flask(__name__)
CORS(
    app,
    resources={
        r"/api/*": {"origins": "*"},
        r"/auth/*": {"origins": "*"},
    },
    supports_credentials=True,
)

# Database Configuration
app.config["SESSION_COOKIE_SAMESITE"] = "None"
app.config["SESSION_COOKIE_SECURE"] = True  # Use this if serving over HTTPS

# Secret Key
app.config["SECRET_KEY"] = "bdbdbjfnfgvjnjvdondndnjnn"
app.config["SQLALCHEMY_DATABASE_URI"] = os.environ.get("DB_URI", "sqlite:///site.db")
app.config["SESSION_PROTECTION"] = "strong"

storage = Storage(app)
print("first- models")


print("getting user")
