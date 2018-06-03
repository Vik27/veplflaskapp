from app import db

class Failuremode1(db.Model):

	__tablename__ = "failuremode1"

	id = db.Column(db.Integer, primary_key = True)

	name = db.Column(db.String(256))

	def to_dict(self):
		return dict(
			qty=0,
			name = self.name,
			id = self.id
		)

	def __repr__(self):
		return '<Failuremode1 %r>' % (self.id)
