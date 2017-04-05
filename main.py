from flask import (Flask, abort, current_app, flash, g, json, redirect,
                   render_template, request, session, url_for)

from build import Builder
from models import *

app = Flask(__name__)
app.secret_key = 'secret_key'

@app.route('/')
@app.route('/index')
def index():
    return render_template('index.html')

# @app.route('/create/<string:type>')
# def create_board():
#     if request.form["type"] == "card":
#         Card.create(title=request.form["title"],content=request.form["content"],status=request.form["status"], order=request.form["order"],board=request.form["border"])
#         new_card = Card.get(title=request.form["title"],content=request.form["content"],status=request.form["status"], order=request.form["order"],board=request.form["border"])
#         card_json = {"title":str(new_card.title),"content":str(new_card.content),"status":str(new_card.status.name),"order":str(new_card.order)}
#         return json.dumps(card_json)

#     elif request.form["type"] == "table":
#         Board.get_or_create(title=request.form["title"])
#         new_board = Board.get(title=request.form["title"])
#         new_board_json = {"title":str(new_board.title)}
#         return json.dumps(new_board)

@app.route('/boards')
def get_boards():

    boards = Table.select()
    data = []
    for board in boards:
        data.append({"id": board.id, "title": board.title})
    return json.dumps(data)


"""def test_create():
    new = Status.get_or_create(Status.name='shit')
    new_status = Status.select().where(Status.name == 'shit').get()
    print(new_status.name)"""

if __name__ == '__main__':
    #test_create()
    app.run()
