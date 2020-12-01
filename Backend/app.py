from flask import Flask

app = Flask(__name__)


@app.route('/')
def hello_world():
    return 'Hello World!'


@app.route('/api/login', methods=['POST'])
def login():
    return 'Login Page!'


if __name__ == '__main__':
    app.run()
