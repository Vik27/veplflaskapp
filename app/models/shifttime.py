from app import db

class Shifttime(db.Model):

	__tablename__ = "shifttime"

	id = db.Column(db.Integer, primary_key = True)

	plantid = db.Column(db.Integer)

	name = db.Column(db.String(16))

	starttime = db.Column(db.DateTime)

	endtime = db.Column(db.DateTime)


	def to_dict(self):
		return dict(
			plantid = self.plantid,
			name = self.name,
			starttime = self.starttime,
			endtime = self.endtime,
			id = self.id
		)

	def __repr__(self):
		return '<Shifttime %r>' % (self.id)
