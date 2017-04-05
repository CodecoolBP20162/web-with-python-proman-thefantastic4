from models.models import *
import json


class ApiQueries:

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

    def create_card(self):
        # if request.form["type"] == "card":
        status = Status.select().where(Status.name == request.form["status"])
        Card.create(
            title=request.form["title"],
            descrption=request.form["description"],
            order=request.form["order"],
            status=status,
            board=request.form["border"]
        )

    def get_cards(self, board_id):
        cards = Card.select().where(Card.board == board_id)

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

    def modify_board(self, board_id, title):
        board = Board.select().where(Board.id == board_id)

        if board.exists():
            board.title = title
            board.save()
            return "true"
        return "false"
