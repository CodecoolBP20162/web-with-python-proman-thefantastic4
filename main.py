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
    return ApiQueries().get_all_boards()


@app.route('/board/<int:board_id>', methods=['GET'])
def get_board(board_id):
    return ApiQueries().get_board(board_id)


@app.route('/boards/<int:board_id>', methods=['POST'])
def remove_or_modify_board(board_id):
    action = request.form.get('action')

    if action == "modify":
        return ApiQueries().modify_board(board_id, request.form.get('title'))

    elif action == "delete":
        return "faszom"


@app.route('/get-cards/<int:board_id>', methods=['GET'])
def get_cards(board_id):
    return ApiQueries().get_cards(board_id)


@app.route('/create/card')
def create_board():
    return ApiQueries().create_card()


@app.route('/is-psql-on/', methods=['GET'])
def is_psql_on():
    return "false"


if __name__ == '__main__':
    Builder().build_tables()
    app.run(debug=True)
