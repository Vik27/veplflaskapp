from app import db

class Shop(db.Model):

	__tablename__ = "shop"

	id = db.Column(db.Integer, primary_key = True)
	
	name = db.Column(db.String(1024))

	plantId = db.Column(db.Integer)
	

	def to_dict(self):
		return dict(
			name = self.name,
			plantId = seld.plantId,
			id = self.id,
		)

	def __repr__(self):
		return '<Shop %r>' % (self.id)


