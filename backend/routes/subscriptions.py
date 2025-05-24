from flask import Blueprint, request, jsonify
from utils.push import register_subscription, send_push_to_all

subscriptions = Blueprint('subscriptions', __name__)

@subscriptions.route('/subscribe', methods=['POST'])
def subscribe():
    data = request.get_json()
    register_subscription(data)
    return jsonify({"message": "Subscribed"}), 201

@subscriptions.route('/notify', methods=['POST'])
def notify():
    data = request.get_json()
    message = data.get("message", "הודעה חדשה!")
    send_push_to_all(message)
    return jsonify(success=True)
