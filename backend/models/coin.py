#!/usr/bin/python3
"""
Define the User class for the 'users' table in the database.
"""

from models.base_model import BaseModel
from models import storage


class Coin(BaseModel, storage.Model):
    """
    Table name in the database

    Attributes:
        __tablename__ (str): The name of the database table.
        name (str): The name of the coin
        description (str): a brief description of the coin
        price (float): The current price of the coin
    """

    __tablename__ = "coin"
    name = storage.Column(storage.String(128), nullable=False, unique=True)
    description = storage.Column(storage.Text, nullable=False)
    price = storage.Column(storage.Float, nullable=False)
