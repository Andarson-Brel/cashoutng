#!/usr/bin/python3
"""
Define the Transaction class for the 'transactions' table in the database.
"""

from models.base_model import BaseModel
from models import storage


class Transaction(BaseModel, storage.Model):
    """
    Table name in the database

    Attributes:
        __tablename__ (str): The name of the database table.
        status (str): The status of the transaction
        quantity (int): The amount of coins
        amount_usd (float): The price in dollars
        amount_ngn (float): The price in naira
    """

    __tablename__ = "transaction"
    status = storage.Column(storage.String(128), default="pending", nullable=False)
    quantity = storage.Column(storage.Integer, nullable=False)
    amount_usd = storage.Column(storage.Float, nullable=True)
    amount_ngn = storage.Column(storage.Float, nullable=True)

    user_id = storage.Column(
        storage.String(128), storage.ForeignKey("user.id"), nullable=True
    )
    user = storage.relationship("User", backref="transactions")
