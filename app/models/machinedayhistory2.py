from app import db

class Machinedayhistory2(db.Model):

        __tablename__ = "machinedayhistory2"

        id = db.Column(db.Integer, primary_key = True)

        date = db.Column(db.DateTime)

        graphtypeid = db.Column(db.Integer)

        value = db.Column(db.BLOB)

        sync = db.Column(db.Integer)


        def to_dict(self):
                return dict(
                        date = self.date,
                        graphtypeid = self.graphtypyeid,
                        value = self.value,
                        sync = self.sync,
                        id = self.id
                )

        def __repr__(self):
                return '<Machinedayhistory2 %r>' % (self.id)
