#!/usr/bin/python3
"""
Define the User class for the 'users' table in the database.
"""

from models.base_model import BaseModel
from models import db


class Coin(BaseModel, db.Model):
    """
    Table name in the database

    Attributes:
        __tablename__ (str): The name of the database table.
        name (str): The name of the coin
        description (str): a brief description of the coin
        price (float): The current price of the coin
    """

    __tablename__ = "coin"
    name = db.Column(db.String(128), nullable=False)
    description = db.Column(db.Text, nullable=False)
    price = db.Column(db.Float, nullable=False)
