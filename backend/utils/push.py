import json
import os
from flask import request, Blueprint, jsonify
from pywebpush import webpush, WebPushException
from dotenv import load_dotenv

load_dotenv()

# רשימת המנויים (בשלב ראשון בזיכרון; בעתיד כדאי להעביר לדאטהבייס)
subscriptions = []

# הגדרת ה-Blueprint
push_blueprint = Blueprint("push", __name__)

# הרשמה לקבלת פוש (צד לקוח שולח את ה-endpoint ו-public key וכו')
@push_blueprint.route("/subscribe", methods=["POST"])
def subscribe():
    data = request.get_json()
    register_subscription(data)
    return jsonify({"message": "נרשמת בהצלחה"}), 201

# שליחת הודעה לכל המנויים
@push_blueprint.route("/send", methods=["POST"])
def send_push():
    data = request.get_json()
    message = data.get("message", "הודעה חדשה")
    send_push_to_all(message)
    return jsonify({"message": "הודעה נשלחה"}), 200

# פונקציית רישום
def register_subscription(data):
    subscriptions.append(data)

# פונקציית שליחה
def send_push_to_all(message):
    vapid = {
        "vapid_private_key": os.getenv("VAPID_PRIVATE_KEY"),
        "vapid_claims": {
            "sub": os.getenv("VAPID_CLAIM_SUB", "mailto:admin@example.com")
        }
    }
    for sub in subscriptions:
        try:
            webpush(subscription_info=sub, data=message, **vapid)
        except WebPushException as e:
            print("❌ Push failed:", e)
