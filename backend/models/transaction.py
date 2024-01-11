#!/usr/bin/python3
"""
Define the Transaction class for the 'transactions' table in the database.
"""

from models.base_model import BaseModel
from models import db


class Transaction(BaseModel, db.Model):
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
    status = db.Column(db.String(128), default="pending", nullable=False)
    quanitiy = db.Column(db.Integer, nullable=False)
    amount_usd = db.Column(db.Float, nullable=False)
    amount_ngn = db.Column(db.Float, nullable=False)

    coin = db.Column(db.String(128), nullable=False)
