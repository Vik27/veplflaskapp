from app import db

class Cyclelog(db.Model):

	__tablename__ = "cyclelog"

	id = db.Column(db.Integer, primary_key = True)
	
	timestamp = db.Column(db.DateTime)

	modelNo =db.Column(db.String(256))

	status =db.Column(db.Integer)

	shift =db.Column(db.Integer)

	okcount=db.Column(db.Integer)

	totalproduction=db.Column(db.Integer)

	def to_dict(self):
		return dict(
			timestamp = self.timestamp,
			modelNo =self.modelNo,
			status =self.status,
			shift =self.shift,
			okcount =self.okcount,
			totalproduction =self.totalproduction,
			id = self.id,
		)

	def __repr__(self):
		return '<Cyclelog %r>' % (self.id)
