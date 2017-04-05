from models.models import *
import json


class ApiQueries:

    def __init__(self, tables):
        if "card" in tables:
            self.card = Card

        if "status" in tables:
            self.stat = Status

        if "board" in tables:
            self.board = Board

    def get_all_boards(self):
        boards = self.board.select()
        data = []

        for board in boards:
            data.append({"id": board.id, "title": board.title})

        return json.dumps(data)

    def get_board(self, board_id):
        response_data = []
        board = self.board.select().where(self.board.id == board_id).get()
        response_data.append({"id": board.id, "title": board.title})

        return json.dumps(response_data)

    def create_card(self, board_id):
        status = self.stat.select().where(self.stat.name == "new").get()
        self.card.create(title="", descrption="", order=0, status=status, board=board_id)

        return str(self.card.select().order_by(self.card.id.desc()).get().id)

    def get_cards(self, board_id):
        cards = self.card.select().where(self.card.board == board_id)
        response_data = []
        for card in cards:
            response_data.append({
                "id": card.id,
                "title": card.title,
                "description": card.description,
                "status": card.status.name,
                "order": card.order,
                "board_id": board_id
            })

        return json.dumps(response_data)

    def delete_card(self, card_id):
        card = self.card.select().where(self.card.id == card_id)

        if card.exists():
            card.delete()

            return "true"
        return "false"

    def modify_card(self, title, description, card_id):
        card = self.card.select().where(self.card.id == card_id)

        if card.exists():
            card.title = title
            card.description = description
            card.save()

            return "true"
        return "false"

    def modify_board(self, board_id, title):
        board = self.board.select().where(self.board.id == board_id)

        if board.exists():
            board.title = title
            board.save()

            return "true"
        return "false"

    def delete_board(self, board_id):
        self.delete_cards_of_board(board_id)
        board = self.board.select().where(self.board.id == board_id)

        if board.exists():
            board.delete()

            return "true"
        return "false"

    def create_board(self):
        self.board.create(title="")
        return str(self.board.select().order_by(self.board.id.desc()).get().id)

    # Additional methods
    def delete_cards_of_board(self, board_id):
        cards = self.card.select().where(self.card.board == board_id)

        for card in cards:
            card.delete()

        return True
