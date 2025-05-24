from utils.db import db

class User(db.Model):
	__tablename__ = "users"

	id = db.Column(db.Integer, primary_key=True)
	name = db.Column(db.String(100), nullable=False)
	email = db.Column(db.String(120), unique=True, nullable=False)
	user_systems = db.relationship('UserSystem', back_populates='user')
	systems = db.relationship('System', secondary='user_system', viewonly=True)

	def __repr__(self):
		return f"<User {self.name}>"