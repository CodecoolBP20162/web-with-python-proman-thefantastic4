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
def get_boards():

    boards = Board.select()
    data = []
    for board in boards:
        data.append({"id": board.id, "title": board.title})
    return json.dumps(data)  

@app.route('/create/card')
def create_board():
    #if request.form["type"] == "card":
    status = Status.select().where(Status.name == request.form["status"])
    Card.create(title=request.form["title"],content=request.form["description"], order=request.form["order"], status=status,board=request.form["border"])

if __name__ == '__main__':
    app.run()

