from flask import Flask, session, request, render_template, redirect, url_for
from flask_socketio import SocketIO

app = Flask(__name__)
app.secret_key = 'dev'
socket = SocketIO(app)


@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        if 'nickname' in request.form and request.form['nickname']:
            session['nickname'] = request.form['nickname']
        return redirect(url_for('index'))

    if 'nickname' in session:
        return render_template('index.html', nickname=session['nickname'])

    return render_template('landing.html')


@app.route('/change')
def change():
    session.pop('nickname')
    return redirect(url_for('index'))


if __name__ == '__main__':
    socket.run(app, host='0.0.0.0', port=80, debug=True)