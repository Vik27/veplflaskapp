from app import db

class Aliverow(db.Model):

	__tablename__ = "aliverow"

	id = db.Column(db.Integer, primary_key = True)
	
	timestamp = db.Column(db.DateTime)
	

	def to_dict(self):
		return dict(
			timestamp = self.timestamp,
			id = self.id,
		)

	def __repr__(self):
		return '<Aliverow %r>' % (self.id)
