#!/usr/bin/python3
"""
Contains the TestTransactionDocs classes
"""

from datetime import datetime
import inspect
import models
from models import transaction
from models.base_model import BaseModel
import pep8
import unittest

Transaction = transaction.Transaction


class TestTransaction(unittest.TestCase):
    """Test the Transaction class"""

    def test_is_subclass(self):
        """Test that Transaction is a subclass of BaseModel"""
        transaction = Transaction()
        self.assertIsInstance(transaction, BaseModel)
        self.assertTrue(hasattr(transaction, "id"))
        self.assertTrue(hasattr(transaction, "created_at"))
        self.assertTrue(hasattr(transaction, "updated_at"))

    def test_status_attr(self):
        """Test that Transaction has attr status, and it's an empty string"""
        transaction = Transaction()
        self.assertTrue(hasattr(transaction, "status"))
        self.assertEqual(transaction.status, None)

    def test_to_dict_creates_dict(self):
        """test to_dict method creates a dictionary with proper attrs"""
        u = Transaction()
        new_d = u.to_dict()
        self.assertEqual(type(new_d), dict)
        self.assertFalse("_sa_instance_state" in new_d)
        for attr in u.__dict__:
            if attr != "_sa_instance_state":
                self.assertTrue(attr in new_d)
        self.assertTrue("__class__" in new_d)

    def test_to_dict_values(self):
        """test that values in dict returned from to_dict are correct"""
        t_format = "%Y-%m-%dT%H:%M:%S.%f"
        u = Transaction()
        new_d = u.to_dict()
        self.assertEqual(type(new_d), dict)
