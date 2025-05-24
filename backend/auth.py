from flask import Blueprint, redirect, session, url_for
from authlib.integrations.flask_client import OAuth
from dotenv import load_dotenv
import os

load_dotenv()

FRONT_END_URL = os.getenv('FRONT_END_URL')
auth = Blueprint('auth', __name__)
oauth = OAuth()
google = None

def config_oauth(app):
    global google
    oauth.init_app(app)
    google = oauth.register(
        name='google',
        client_id=os.getenv('GOOGLE_CLIENT_ID'),
        client_secret=os.getenv('GOOGLE_CLIENT_SECRET'),
        server_metadata_url='https://accounts.google.com/.well-known/openid-configuration',
        client_kwargs={'scope': 'openid email profile'}
    )


@auth.route('/auth/google')
def login():
    redirect_uri = url_for('auth.callback', _external=True)
    return google.authorize_redirect(redirect_uri)

@auth.route('/auth/google/callback')
def callback():
    google.authorize_access_token()
    userinfo = google.get('https://openidconnect.googleapis.com/v1/userinfo').json()
    session['user'] = userinfo
    return redirect(FRONT_END_URL + '/dashboard')
