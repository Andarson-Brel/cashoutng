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
        logo (str): The logo of the coin
        price (float): The current price of the coin
        abv (str): abbreviation of the coin name
        walletAddress (str): The address of the crypto wallet for coin payments
    """

    __tablename__ = "coin"
    name = storage.Column(storage.String(128), nullable=False)
    logo = storage.Column(storage.String(128), nullable=False)
    abv = storage.Column(storage.String(20), nullable=False)
    price = storage.Column(storage.Float, nullable=False)
    walletAddress = storage.Column(storage.String(128), nullable=False)
    unitPrice = storage.Column(storage.Float, nullable=False)
