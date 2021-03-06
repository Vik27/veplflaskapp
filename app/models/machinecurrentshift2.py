from app import db

class Machinecurrentshift2(db.Model):

        __tablename__ = "machinecurrentshift2"

        id = db.Column(db.Integer, primary_key = True)

        graphtypeid = db.Column(db.Integer)

        value = db.Column(db.BLOB)

        sync = db.Column(db.Integer)

	timestamp =db.Column(db.DateTime)
        def to_dict(self):
                return dict(
			timestamp = self.timestamp,
                        graphtypeid = self.graphtypyeid,
                        value = self.value,
                        sync = self.sync,
                        id = self.id
                )

        def __repr__(self):
                return '<Machinecurrentshift2 %r>' % (self.id)
