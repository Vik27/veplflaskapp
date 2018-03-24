from app import db

class Downtimereason(db.Model):

	__tablename__ = "downtimereason"

	id = db.Column(db.Integer, primary_key = True)

	name = db.Column(db.String(256))

	def to_dict(self):
		return dict(
			name = self.name,
			id = self.id,
		)

	def __repr__(self):
		return '<Downtimereason %r>' % (self.id)