from models import *


class Builder:
    def __init__(self):
        self.tables = [Board, Card, Status]
        self.statuses = ["new", "inprogress", "review", "done"]
        self.dummy_table = "starter board"
        self.dummy_table2 = "second starter board"
        self.dummy_cards = [["Story One", "content one", "new", 1, "starter board"],
                            ["Story Two", "content two", "new", 2, "starter board"],
                            ["Story Three", "content three", "new", 1, "starter board"]]

    def build_tables(self):
        db.connect()
        db.drop_tables(self.tables, safe=True, cascade=True)
        db.create_tables(self.tables, safe=True)
        self.create_dummy_data()

    def create_dummy_data(self):

        for status in self.statuses:
            Status.create(name=status)

        Board.create(title=self.dummy_table)
        Board.create(title=self.dummy_table2)

        for card in self.dummy_cards:

            status = None

            if card[2] == "new":
                status = Status.select().where(Status.name == "new").get()
            elif card[2] == "inprogress":
                status = Status.select().where(Status.name == "inprogress").get()
            elif card[2] == "review":
                status = Status.select().where(Status.name == "review").get()
            elif card[2] == "done":
                status = Status.select().where(Status.name == "done").get()

            board = Board.select().where(Board.title == self.dummy_table)

            Card.create(title=card[0], description=card[1], status=status, order=card[3], board=board)


if __name__ == "__main__":
    Builder().build_tables()
