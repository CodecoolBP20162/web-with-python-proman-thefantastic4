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
        boards = Board.select()
        data = []

        for board in boards:
            data.append({"id": board.id, "title": board.title})

        return json.dumps(data)

    def get_board(self, board_id):
        response_data = []
        board = Board.select().where(Board.id == board_id).get
        response_data.append({"id": board.id, "title": board.title})

        return json.dumps(response_data)

    def create_card(self,board_id):

        status = self.stat.select().where(Status.name == "new")
        self.card.create(title="", descrption="", order=0, status=status, board=board_id)


    def get_cards(self, board_id):
        cards = self.card.select().where(self.card.board == board_id)
        cards_list = []
        for card in cards:
            cards_list.append({
                "id": card.id,
                "title": card.title,
                "description": card.description,
                "status": card.status.name,
                "order": card.order,
                "board_id": board_id
            })

        return json.dumps(cards_list)

    def modify_card(self):



    def modify_board(self, board_id, title):
        board = Board.select().where(Board.id == board_id)

        if board.exists():
            board.title = title
            board.save()
            return "true"
        return "false"
