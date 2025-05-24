from flask import Flask, send_from_directory, session, redirect
from flask_session import Session
from flask_cors import CORS
from dotenv import load_dotenv
import os
from auth import auth, config_oauth
from routes import register_routes
from utils.db import db
from models import User, System

load_dotenv()

app = Flask(__name__, static_folder='static')
app.secret_key = os.getenv('SESSION_SECRET')
FRONT_END_URL = os.getenv('FRONT_END_URL')
app.config['SESSION_TYPE'] = 'filesystem'
Session(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:Aa123456@localhost:5432/Mishmarot'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)

# Auth & routes
app.register_blueprint(auth)
config_oauth(app)
register_routes(app)

CORS(app, supports_credentials=True, origins=[FRONT_END_URL])

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    if path and os.path.exists(os.path.join(app.static_folder, path)):
        return send_from_directory(app.static_folder, path)
    return send_from_directory(app.static_folder, 'index.html')

if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    app.run(debug=True)
