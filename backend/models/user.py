#!/usr/bin/python3
"""
Define the User class for the 'users' table in the database.
"""

from models import storage
from models.base_model import BaseModel

print("user class")


class User(BaseModel, storage.Model):
    """
    Table name in the database

    Attributes:
        __tablename__ (str): The name of the database table.
        email (str): The email address of the user. Required field.
        firstName (str): The first name of the user. Required field.
        lastName (str): The last name of the user. Required field.
        username (str): The username chosen by the user. Required field.
        password (str): The hashed password of the user. Required field.
        isAdmin (bool): Whether the user is an administrator
        bank (str): the name of the users bank. Required field
        accountName (str): The name on the user's account. Required field
        accountNumber (str): The user's account number. Required field
        phoneNumber (str): The user's phone number. Required field
        isValidated (bool): Whether the user is email-verified. Required field
    """

    __tablename__ = "user"
    firstName = storage.Column(storage.String(128), nullable=False)
    lastName = storage.Column(storage.String(128), nullable=False)
    email = storage.Column(storage.String(128), nullable=False, unique=True)
    password = storage.Column(storage.String(128), nullable=False)
    isAdmin = storage.Column(storage.Boolean(128), nullable=False, default=False)
    username = storage.Column(storage.String(128), nullable=False)
    bank = storage.Column(storage.String(128), nullable=False)
    accountName = storage.Column(storage.String(128), nullable=False)
    accountNumber = storage.Column(storage.String(128), nullable=False)
    phoneNumber = storage.Column(storage.String(128), nullable=False)
    isValidated = storage.Column(storage.Boolean, nullable=False, default=False)

    def is_active(self):
        # Define your own logic for determining if the user is active or not
        return True

    def is_authenticated(self):
        return True

    def get_id(self):
        print("getting id")
        return self.id

    def is_anonymous(self):
        return False
