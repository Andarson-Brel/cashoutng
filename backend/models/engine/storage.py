from models import db
from models.user import User
from models.transaction import Transaction
from models.coin import Coin

classes = {"Coin": Coin, "User": User, "Transaction": Transaction}


class Storage:
    """interaacts with the database"""

    def save():
        """commit all changes of the current database session"""
        db.session.commit()

    def delete(self, obj=None):
        """delete from the current database session obj if not None"""
        if obj is not None:
            db.session.delete(obj)

    def all(self, cls=None, id=None):
        """get all models from the database"""
        if cls is not None:
            if id is not None:
                return (
                    db.session.execute(db.select(cls).where(cls.id == id))
                    .scalars()
                    .all()
                )
        return db.session.execute(db.select(cls)).scalars().all()

    def new(self, obj):
        """add the object to the current database session"""
        db.session.add(obj)

    def get(self, cls, id):
        """
        Returns the object based on the class name and its ID, or
        None if not found
        """
        if cls not in classes.values():
            return None

        val = db.session.execute(db.select(cls).where(cls.id == id)).scalar()
        if val:
            return val
        else:
            return None

    def count(self, cls=None):
        """
        count the number of objects in storage
        """
        all_class = classes.values()

        if not cls:
            count = 0
            for clas in all_class:
                count += len(self.all(clas))
        else:
            count = len(self.all(cls))

        return count
