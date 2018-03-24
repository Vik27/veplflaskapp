from app import db

class Productionlog(db.Model):

	__tablename__ = "productionlog"

	id = db.Column(db.Integer, primary_key = True)
	
	timestamp = db.Column(db.DateTime)

	status = db.Column(db.Enum('on','off','disconnected'))
	

	def to_dict(self):
		return dict(
			timestamp = self.timestamp,
			status =self.status,
			id = self.id,
		)

	def __repr__(self):
		return '<Productionlog %r>' % (self.id)
