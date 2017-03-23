from flask import Flask, request, session, g, redirect, url_for, abort, \
    render_template, flash, current_app

app = Flask(__name__)
app.secret_key = 'secret_key'


@app.route('/')
@app.route('/index')
def index():
    return render_template('index.html')

if __name__ == '__main__':
    app.run(debug = True)
