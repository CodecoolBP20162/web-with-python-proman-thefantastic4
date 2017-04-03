import os
from peewee import *
import traceback

def connection():
    f_path = os.path.join(os.path.dirname(__file__), "parameter.txt")
    with open(f_path, 'r') as ident:
        log_in = ident.readlines()
        db = PostgresqlDatabase(log_in[0], user=log_in[0])
        try:
            db.connect()
            print("Database connection established.")
            for line in traceback.format_stack():
                print(line.strip())
        except:
            print("Can't connect to database.\nPlease check your connection.txt file.")
        return db

db = connection()


class BaseModel(Model):

    class Meta:
        database = db

class Table(BaseModel):
    title = CharField()
    card_order = CharField()


class Status(BaseModel):
    name = CharField()


class Card(BaseModel):
    title = TextField()
    content = TextField()
    status = ForeignKeyField(Status, related_name="status")
    order = IntegerField()
    board = ForeignKeyField(Table, related_name="table")


