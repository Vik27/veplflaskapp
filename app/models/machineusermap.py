from app import db

class Machineusermap(db.Model):

	__tablename__ = "machineusermap"

	id = db.Column(db.Integer, primary_key = True)
	
	machineId = db.Column(db.Integer)

	userId = db.Column(db.String(128))


	def to_dict(self):
		return dict(
			machineId = self.machineId,
			userId = self.userId,
			id = self.id
		)

	def __repr__(self):
		return '<Machineusermap %r>' % (self.id)

