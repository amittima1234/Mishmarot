from .api import api
from .subscriptions import subscriptions

def register_routes(app):
    app.register_blueprint(api)
    app.register_blueprint(subscriptions)
