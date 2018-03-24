from app import db

class Cyclelog(db.Model):

	__tablename__ = "cyclelog"

	id = db.Column(db.Integer, primary_key = True)
	
	timestamp = db.Column(db.DateTime)

	cycleTime =db.Column(db.Float)

	count =db.Column(db.Integer)

	T2 = db.Column(db.Float)

	T3 = db.Column(db.Float)

	T4 = db.Column(db.Float)

	T5 = db.Column(db.Float)

	T6 = db.Column(db.Float)

	T7 = db.Column(db.Float)

	fillTime = db.Column(db.Float)

	clampOpenTime = db.Column(db.Float)

	clampCloseTime = db.Column(db.Float)

	minCushion = db.Column(db.Float)

	partStatus = db.Column(db.Integer)

	def to_dict(self):
		return dict(
			timestamp = self.timestamp,
			cycleTime =self.cycleTime,
			count =self.count,
			T2 = self.T2,
			T3 = self.T3,
			T4 = self.T4,
			T5 = self.T5,
			T6 = self.T6,
			T7 = self.T7,
			fillTime = self.fillTime,
			clampOpenTime = self.clampOpenTime,
			clampCloseTime = self.clampCloseTime,
			minCushion = self.minCushion,
			partStatus = self.partStatus,
			id = self.id,
		)

	def __repr__(self):
		return '<Cyclelog %r>' % (self.id)
