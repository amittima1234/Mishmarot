from utils.db import db

class System(db.Model):
    __tablename__ = "systems"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    active = db.Column(db.Boolean, default=True)

    user_systems = db.relationship('UserSystem', back_populates='system')
    users = db.relationship('User', secondary='user_system', viewonly=True)

    def __repr__(self):
        return f"<System {self.name}>"