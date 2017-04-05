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


@app.route('/create/card')
def create_board():
    #if request.form["type"] == "card":
    status = Status.select().where(Status.name == request.form["status"])
    Card.create(title=request.form["title"], descrption=request.form["description"], order=request.form["order"], status=status,board=request.form["border"])

if __name__ == '__main__':
    app.run()

