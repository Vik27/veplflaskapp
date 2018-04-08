from app import db

class Shiftstat(db.Model):

	__tablename__ = "shiftstat"

	id = db.Column(db.Integer, primary_key = True)
	
	shifttartdatetime = db.Column(db.DateTime)

	shiftid=db.Column(db.Integer)

	okcount=db.Column(db.Integer)

	totalproduction=db.Column(db.Integer)

	unplanneddowntime=db.Column(db.Float)

	planneddowntime =db.Column(db.Float)

	totaloktime =db.Column(db.Float)

	availability =db.Column(db.Float)

	performance =db.Column(db.Float)

	quality =db.Column(db.Float)

	defectsid=db.Column(db.Integer)

	def to_dict(self):
		return dict(
			defectsid = self.defectsid,
			quality = self.quality,
			performance = self.performance,
			availability = self.availability,
			totaloktime = self.totaloktime,
			planneddowntime = self.timestamp,
			unplanneddowntime =self.unplanneddowntime,
			okcount =self.okcount,
			totalproduction =self.totalproduction,
			shiftid =self.shiftid,
			shifttartdatetime =self.shifttartdatetime,
			id = self.id,
		)

	def __repr__(self):
		return '<Shiftstat %r>' % (self.id)
