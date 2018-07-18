from app import db

class Machinecurrentshift1(db.Model):

        __tablename__ = "machinecurrentshift1"

        id = db.Column(db.Integer, primary_key = True)

        graphtypeid = db.Column(db.Integer)

        value = db.Column(db.BLOB)

        sync = db.Column(db.Integer)

	timestamp = db.Column(db.DateTime)
        def to_dict(self):
                return dict(
                        graphtypeid = self.graphtypyeid,
                        value = self.value,
                        sync = self.sync,
			timestamp = self.timestamp,
                        id = self.id
                )

        def __repr__(self):
                return '<Machinecurrentshift1 %r>' % (self.id)
