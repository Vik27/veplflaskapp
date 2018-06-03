from app import db

class Partmodel1(db.Model):

	__tablename__ = "partmodel1"

	id = db.Column(db.Integer, primary_key = True)

	name = db.Column(db.String(256))

	cycletime =db.Column(db.Float)

	shiftrate =db.Column(db.Integer) #production per shift

	sapcode = db.Column(db.String(64))
	
	def to_dict(self):
		return dict(
			sapcode= self.sapcode,
			cycletime = self.cycletime,
			shiftrate = self.shiftrate,
			name = self.name,
			id = self.id
		)

	def __repr__(self):
		return '<Partmodel1 %r>' % (self.id)
