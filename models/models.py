import os
from peewee import *


def connection():
    f_path = os.path.join(os.path.dirname(__file__), "parameter.txt")
    with open(f_path, 'r') as ident:
        log_in = ident.readlines()
        db = PostgresqlDatabase(
            log_in[2].strip(),  # Required by Peewee.
            user=log_in[0].strip(),  # Will be passed directly to psycopg2.
            password=log_in[1].strip(),  # Ditto.
            host='localhost',  # Ditto.
        )
        try:
            db.connect()
            print("Database connection established.")
        except:
            print("Can't connect to database.\nPlease check your connection.txt file.")
        return db

db = connection()


class BaseModel(Model):

    class Meta:
        database = db


class Board(BaseModel):
    title = CharField()


class Status(BaseModel):
    name = CharField()


class Card(BaseModel):
    title = TextField()
    description = TextField()
    status = ForeignKeyField(Status)
    order = IntegerField()
    board = ForeignKeyField(Board)


