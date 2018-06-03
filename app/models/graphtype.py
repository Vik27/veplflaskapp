from app import db

class Graphtype(db.Model):

	__tablename__ = "graphtype"

	id = db.Column(db.Integer, primary_key = True)
	
	name = db.Column(db.String(128))

	datatype =db.Column(db.String(64))

	graphcat =db.Column(db.String(64))

	durationtype =db.Column(db.String(64))


	def to_dict(self):
		return dict(
			durationtype =self.durationtype,
			graphcat =self.graphcat,
			datatype =self.datatype,
			name = self.name,
			id = self.id
		)


	def __repr__(self):
		return '<Graphtype %r>' % (self.id)