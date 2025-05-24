from utils.db import db
from datetime import datetime


class UserSystem(db.Model):
    __tablename__ = 'user_system'

    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), primary_key=True)
    system_id = db.Column(db.Integer, db.ForeignKey('systems.id'), primary_key=True)
    role = db.Column(db.String(50))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    user = db.relationship('User', back_populates='user_systems')
    system = db.relationship('System', back_populates='user_systems')
