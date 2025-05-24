from .db import db
from .push import push_blueprint

def register_routes(app):
    app.register_blueprint(push_blueprint, url_prefix="/api/push")
