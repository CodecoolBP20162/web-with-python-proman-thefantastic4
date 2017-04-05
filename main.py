from flask import (Flask, abort, current_app, flash, g, json, redirect,
                   render_template, request, session, url_for)
from models.build import Builder
from models.api_queries import ApiQueries

app = Flask(__name__)
app.secret_key = 'secret_key'


@app.route('/')
@app.route('/index')
def index():
    return render_template('index.html')


@app.route('/boards', methods=["GET"])
def boards():
    return ApiQueries(["board"]).get_all_boards()


@app.route('/board/<int:board_id>', methods=['GET'])
def get_board(board_id):
    return ApiQueries(["board"]).get_board(board_id)


@app.route('/boards/<int:board_id>', methods=['POST'])
def remove_or_modify_board(board_id):
    action = request.form.get('action')

    if action == "modify":
        return ApiQueries(["board"]).modify_board(board_id, request.form.get('title'))

    elif action == "delete":
        return ApiQueries(["board"]).delete_board(board_id)


@app.route('/cards/<int:board_id>', methods=['GET'])
def get_cards(board_id):
    return ApiQueries(["card", "status"]).get_cards(board_id)


@app.route('/card/<int:card_id>', methods=["POST"])
def modify_and_remove_card(card_id):
    if request.form["action"] == "modify":
        return ApiQueries(["card"]).modify_card(request.form["title"], request.form["description"], card_id)
    if request.form["action"] == "delete":
        return ApiQueries(["card"]).delete_card(card_id)


@app.route('/card', methods=['POST'])
def create_card(board_id):
    return ApiQueries(["card", "board"]).create_card(board_id)


@app.route('/board', methods=['POST'])
def create_board():
    return ApiQueries(["board"]).create_board()


@app.route('/is-psql-on/', methods=['GET'])
def is_psql_on():
    return "false"


if __name__ == '__main__':
    Builder().build_tables()
    app.run(debug=True)
