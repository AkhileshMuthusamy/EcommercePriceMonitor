from flask import Flask
from flask_restful import Api
from flask_cors import CORS
import firebase_admin
from firebase_admin import credentials, firestore
cred = credentials.Certificate("config/firebase_pvt_key.json")
firebase_admin.initialize_app(cred)
db = firestore.client()

from module.user import RegisterUser, UserLogin

app = Flask(__name__)
api = Api(app)
CORS(app)

api.add_resource(UserLogin, '/login')
api.add_resource(RegisterUser, '/register')

if __name__ == '__main__':
    app.run(debug=True)
