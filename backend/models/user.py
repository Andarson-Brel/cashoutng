#!/usr/bin/python3
"""
Define the User class for the 'users' table in the database.
"""

from models.base_model import BaseModel
from models import db


class User(BaseModel, db.Model):
    """
    Table name in the database

    Attributes:
        __tablename__ (str): The name of the database table.
        email (str): The email address of the user. Required field.
        first_name (str): The first name of the user. Required field.
        last_name (str): The last name of the user. Required field.
        username (str): The username chosen by the user. Required field.
        password_hash (str): The hashed password of the user. Required field.
        profile_pic_url (str): The URL of the user's profile picture.
        is_admin (bool): Whether the user is an administrator
        bank (str): the name of the users bank. Required field
        account_name (str): The name on the user's account. Required field
        account_number (str): The user's account number. Required field
    """

    __tablename__ = "user"
    first_name = db.Column(db.String(128), nullable=False)
    last_name = db.Column(db.String(128), nullable=False)
    email = db.Column(db.String(128), nullable=False, unique=True)
    first_name = db.Column(db.String(128), nullable=False)
    password_hash = db.Column(db.String(128), nullable=False)
    is_admin = db.Column(db.String(128), nullable=False, default=False)
    username = db.Column(db.String(128), nullable=False)
    bank = db.Column(db.String(128), nullable=False)
    account_name = db.Column(db.String(128), nullable=False)
    account_number = db.Column(db.String(128), nullable=False)

    def is_active(self):
        # Define your own logic for determining if the user is active or not
        return True

    def is_authenticated(self):
        return True
