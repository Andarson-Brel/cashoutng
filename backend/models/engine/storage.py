#!/usr/bin/python3
"""Storage class"""
from flask import Flask
from flask_sqlalchemy import SQLAlchemy


class Storage(SQLAlchemy):
    """interaacts with the database"""

    def __init__(
        self,
        app: Flask | None = None,
    ):
        """initialize the database"""
        super().__init__(
            app,
        )

    def save(self):
        """commit all changes of the current database session"""

        self.session.commit()

    def delete(self, obj=None):
        """delete from the current database session obj if not None"""
        if obj is not None:
            self.session.delete(obj)

    def all(self, cls=None, id=None):
        """get all models from the database"""
        if cls is not None:
            if id is not None:
                return (
                    self.session.execute(self.select(cls).where(cls.id == id))
                    .scalars()
                    .all()
                )
        return self.session.execute(self.select(cls)).scalars().all()

    def new(self, *obj):
        """add the object to the current database session"""
        [self.session.add(ob) for ob in obj]

        # self.session.add(obj)

    def get(self, cls, id):
        """
        Returns the object based on the class name and its ID, or
        None if not found
        """

        val = self.session.execute(self.select(cls).where(cls.id == id)).scalar()
        if val:
            return val
        else:
            return None

    # def count(self, cls=None):
    #     """
    #     count the number of objects in storage
    #     """
    #     all_class = classes.values()

    #     if not cls:
    #         count = 0
    #         for clas in all_class:
    #             count += len(self.all(clas))
    #     else:
    #         count = len(self.all(cls))

    #     return count
