from flask import Blueprint, session, jsonify

api = Blueprint('api', __name__)

@api.route('/api/user')
def get_user():
    if 'user' in session:
        return jsonify(session['user'])
    return jsonify({'error': 'Not logged in'}), 401

@api.route('/api/logout', methods=['POST'])
def logout():
    print(session)
    session.clear()
    print(session)
    return jsonify({"message": "Logged out"}), 200
