from app import db

class Machine(db.Model):

	__tablename__ = "machine"

	id = db.Column(db.Integer, primary_key = True)
	
	name = db.Column(db.String(1024))

	machineNo = db.Column(db.Integer)

	machineSapCode = db.Column(db.String(1024))

	make = db.Column(db.String(1024))

	siteId = db.Column(db.Integer)
	

	def to_dict(self):
		return dict(
			name = self.name,
			machineNo = self.machineNo,
			machineSapCode = self.machineSapCode,
			make = self.make,
			siteId = seld.siteId,
			id = self.id,
		)

	def __repr__(self):
		return '<Machine %r>' % (self.id)
