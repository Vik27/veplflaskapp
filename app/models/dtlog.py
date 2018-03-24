from app import db

class Dtlog(db.Model):

	__tablename__ = "dtlog"

	id = db.Column(db.Integer, primary_key = True)
	
	timestamp = db.Column(db.DateTime)

	dtreason = db.Column(db.Integer)

	def to_dict(self):
		return dict(
			timestamp = self.timestamp,
			dtreason =self.dtreason,
			id = self.id,
		)

	def __repr__(self):
		return '<Dtlog %r>' % (self.id)