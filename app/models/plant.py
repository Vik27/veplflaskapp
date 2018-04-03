from app import db

class Plant(db.Model):

	__tablename__ = "plant"

	id = db.Column(db.Integer, primary_key = True)
	
	name = db.Column(db.String(1024))

	address = db.Column(db.String(1024))

	businessId = db.Column(db.Integer)
	

	def to_dict(self):
		return dict(
			name = self.name,
			address = self.address,
			businessId = seld.businessId,
			id = self.id,
		)

	def __repr__(self):
		return '<Plant %r>' % (self.id)
