from models.models import *
import json


class ApiQueries:
    def __init__(self, tables):
        if "card" in tables:
            self.card = Card

        if "status" in tables:
            self.status = Status

        if "board" in tables:
            self.board = Board

    def get_all_boards(self):
        boards = self.board.select()
        data = []

        for board in boards:
            data.append({"id": board.id, "title": board.title})

        return json.dumps(data)

    def get_board(self, board_id):
        board = self.board.select().where(self.board.id == board_id).get()
        response_data = {"id": board.id, "title": board.title}

        return json.dumps(response_data)

    def create_card(self, board_id):
        status = self.status.select().where(self.status.name == "new").get()

        count_cards = self.card.select().where(
            (self.card.status == status.id) &
            (self.card.board == board_id)
        ).wrapped_count()

        self.card.create(
            title="",
            description="",
            order=count_cards,
            status=status.id,
            board=board_id
        )

        return str(self.card.select().order_by(self.card.id.desc()).get().id)

    def get_cards(self, board_id):
        cards = self.card.select().where(self.card.board == board_id).order_by(self.card.order.asc())
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

    def get_card(self, card_id):
        card = self.card.select().where(self.card.id == card_id)
        if card.exists():
            card = card.get()
            response_data = {
                "id": str(card.id),
                "description": card.description,
                "title": card.title,
                "order": card.order,
                "status": card.status.name,
                "board_id": str(card.board.id)
            }
            return json.dumps(response_data)
        return "false"

    def delete_card(self, card_id):
        card = self.card.select().where(self.card.id == card_id)

        if card.exists():
            card = card.get()
            card.delete_instance()
            self.reorder_cards_on_board(card.board.id, card.status.id)

            return "true"
        return "false"

    def modify_card(self, title, description, card_id):
        card = self.card.select().where(self.card.id == card_id)

        if card.exists():
            card = card.get()
            card.title = title
            card.description = description
            card.save()

            return "true"
        return "false"

    def modify_board(self, board_id, title):
        board = self.board.select().where(self.board.id == board_id)

        if board.exists():
            board = board.get()
            board.title = title
            board.save()
            return "true"

        return "false"

    def delete_board(self, board_id):
        self.delete_cards_of_board(board_id)
        board = self.board.select().where(self.board.id == board_id)

        if board.exists():
            board.get().delete_instance()

            return "true"
        return "false"

    def create_board(self):
        self.board.create(title="")
        return str(self.board.select().order_by(self.board.id.desc()).get().id)

    def move_card(self, card_id, new_status, new_position):
        card_to_move = self.card.select().where(self.card.id == card_id)
        new_status = self.status.select().where(self.status.name == new_status).get()

        if card_to_move.exists():
            card_to_move = card_to_move.get()
            current_status = card_to_move.status.id
            self.increase_order_after(card_to_move.board.id, new_status.id, new_position)
            card_to_move.status = new_status.id
            card_to_move.order = new_position
            card_to_move.save()
            self.reorder_cards_on_board(card_to_move.board.id, current_status)


        return "true"

    # Additional methods
    def delete_cards_of_board(self, board_id):
        cards = self.card.select().where(self.card.board == board_id)

        for card in cards:
            card.delete_instance()

        return "true"

    def reorder_cards_on_board(self, board_id, status_id):
        cards = self.card.select().where(self.card.board == board_id and self.card.status == status_id).order_by(self.card.order.asc())

        current_order = 0
        for card in cards:
            card.order = current_order
            card.save()
            current_order += 1

        return "true"

    def increase_order_after(self, board_id, status_id, order_index):
        cards_to_increase = self.card.select().where(self.card.board == board_id and self.card.status == id and self.card.order >= order_index)

        for card in cards_to_increase:
            card.order += 1
            card.save()

        return "true"
