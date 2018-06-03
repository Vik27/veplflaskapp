from app import db

class Breaktimetable1(db.Model):

	__tablename__ = "breaktimetable1"

	id = db.Column(db.Integer, primary_key = True)

	name = db.Column(db.String(256))

	starttime = db.Column(db.DateTime)

	stoptime = db.Column(db.DateTime)


	def to_dict(self):
		return dict(
			name = self.name,
			starttime = self.starttime,
			stoptime = self.stoptime,
			id = self.id
		)

	def __repr__(self):
		return '<Breaktimetable1 %r>' % (self.id)


