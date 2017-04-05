from flask import (Flask, abort, current_app, flash, g, json, redirect,
                   render_template, request, session, url_for)
#from build import Builder
from models import *

app = Flask(__name__)
app.secret_key = 'secret_key'

@app.route('/')
@app.route('/index')
def index():
    return render_template('index.html')

@app.route('/boards')
def boards():

    boards = Board.select()
    data = []
    for board in boards:
        data.append({"id": board.id, "title": board.title})
    return json.dumps(data)  

@app.route('/board/<int:board_id>', methods=['GET','POST'])
def get_board(board_id):
    response_data = []
    board = Board.select().where(Board.id == board_id).get
    response_data.append({"id": board.id, "title": board.title})
    return json.dumps(response_data)


@app.route('/create/card/<int:board_id>', methods=["POST"])
def create_card():
    status = Status.select().where(Status.name == "new")
    Card.create(title="", descrption="", order=0, status=status, board=request.form["board_id"])


@app.route('/create/board')
def create_board():
    Board.create(title="new_board")
    return "new board created"

if __name__ == '__main__':
    app.run()

