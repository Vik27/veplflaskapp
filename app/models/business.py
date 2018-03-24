from app import db

class Business(db.Model):

	__tablename__ = "business"

	id = db.Column(db.Integer, primary_key = True)
	
	name = db.Column(db.String(20))

	users = db.relationship('User', backref='business', lazy='dynamic')

	
	def to_dict(self):
		return dict(
			name = self.name,
			id = self.id
		)

	def __repr__(self):
		return '<Business %r>' % (self.id)
