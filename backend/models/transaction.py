#!/usr/bin/python3
"""
Define the Transaction class for the 'transactions' table in the database.
"""

from models import storage
from models.base_model import BaseModel
from models.coin import Coin


class Transaction(BaseModel, storage.Model):
    """
    Table name in the database

    Attributes:
        __tablename__ (str): The name of the database table.
        status (str): The status of the transaction
        quantity (int): The amount of coins
        valueUsd (float): The price in dollars
        valueInNaira (float): The price in naira
        userName (str): The name of the user that carried out the transaction
        coinName (str): The name of the coin sold
    """

    __tablename__ = "transaction"
    status = storage.Column(storage.String(128), default="pending", nullable=False)
    quantity = storage.Column(storage.Integer, nullable=False)
    valueUsd = storage.Column(storage.Float, nullable=False)
    valueInNaira = storage.Column(storage.Float, nullable=False)
    userName = storage.Column(storage.String(128), nullable=False)
    coinName = storage.Column(storage.String(60), nullable=False)
    userId = storage.Column(
        storage.String(128), storage.ForeignKey("user.id"), nullable=False
    )
    # coinId = storage.Column(
    #     storage.String(128), storage.ForeignKey("coin.id"), nullable=False
    # )
    imgUrl = storage.Column(storage.String(255), nullable=True)
    # coin = storage.relationship("Coin", backref="transactions")
    user = storage.relationship("User", backref="transactions")
