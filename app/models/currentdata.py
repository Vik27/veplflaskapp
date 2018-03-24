from app import db

class Currentdata(db.Model):

	__tablename__ = "currentdata"

	id = db.Column(db.Integer, primary_key = True)

	currentMouldName = db.Column(db.String(256))

	currentMouldTarget = db.Column(db.Integer)

	currentMouldOKCount = db.Column(db.Integer)

	currentMouldNotOKCount = db.Column(db.Integer)

	currentShiftOKCount = db.Column(db.Integer)

	currentShiftNotOKCount = db.Column(db.Integer)

	currentMode = db.Column(db.Integer)


	def to_dict(self):
		return dict(
			currentMouldName = self.currentMouldName,
			currentMouldTarget = self.currentMouldTarget,
			currentMouldOKCount = self.currentMouldOKCount,
			currentMouldNotOKCount = self.currentMouldNotOKCount,
			currentShiftOKCount = self.currentShiftOKCount,
			currentShiftNotOKCount = currentShiftNotOKCount,
			currentMode = self.currentMode,
			id = self.id,
		)

	def __repr__(self):
		return '<Currentdata %r>' % (self.id)

	