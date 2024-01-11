from flask import Flask
from flask_sqlalchemy import SQLAlchemy
import os

app = Flask(__name__)

# Database Configuration
app.config["SQLALCHEMY_DATABASE_URI"] = os.environ.get("DB_URI", "sqlite:///site.db")

# Secret Key
app.config["SECRET_KEY"] = os.environ.get("FLASK_SECRET_KEY", "dgcvhbjhljhibyhbdsbd")

db = SQLAlchemy(app)

if __name__ == "__main__":
    app.run(debug=True)
