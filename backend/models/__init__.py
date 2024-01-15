from flask import Flask
from models.engine.storage import Storage
import os

# from models.engine.storage import Storage


app = Flask(__name__)
# Database Configuration

# Secret Key
app.config["SECRET_KEY"] = os.environ.get("FLASK_SECRET_KEY", "dgcvhbjhljhibyhbdsbd")
app.config["SQLALCHEMY_DATABASE_URI"] = os.environ.get("DB_URI", "sqlite:///site.db")
storage = Storage(app)
