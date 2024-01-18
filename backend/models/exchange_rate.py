#!/usr/bin/python3
"""
Define the Transaction class for the 'transactions' table in the database.
"""

from models import storage
from models.base_model import BaseModel


class ExchangeRate(BaseModel, storage.Model):
    """
    Table name in the database

    Attributes:
        __tablename__ (str): The name of the database table.
        rate (float): the current daily rate for transactions
    """

    __tablename__ = "exchange_rate"
    rate = storage.Column(storage.Float, nullable=False)
