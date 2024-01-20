import os

from flask import Flask
from flask_cors import CORS
from flask_login import LoginManager
from models.engine.storage import Storage

# from models.engine.storage import Storage


app = Flask(__name__)
CORS(
    app,
    resources={
        r"/api/*": {"origins": "http://localhost:3000"},
        r"/auth/*": {"origins": "http://localhost:3000"},
    },
)

# Database Configuration

# Secret Key
app.config["SECRET_KEY"] = os.environ.get("FLASK_SECRET_KEY", "dgcvhbjhljhibyhbdsbd")
app.config["SQLALCHEMY_DATABASE_URI"] = os.environ.get("DB_URI", "sqlite:///site.db")
storage = Storage(app)

login_manager = LoginManager(app)
