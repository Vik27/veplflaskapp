from app import db

class Dtinterlock1(db.Model):

	__tablename__ = "dtinterlock1"

	id = db.Column(db.Integer, primary_key = True)

	downtimethreshold = db.Column(db.Integer) # in seconds

	interlockfrequencyid = db.Column(db.Integer) # foreign key from interlockfrequency admin table

	interlockexecutethreshold = db.Column(db.Integer) # in seconds


	def to_dict(self):
		return dict(
			downtimethreshold = self.downtimethreshold,
			interlockfrequencyid = self.interlockfrequencyid,
			interlockexecutethreshold = self.interlockexecutethreshold,
			id = self.id
		)

	def __repr__(self):
		return '<Dtinterlock1 %r>' % (self.id)


