from app import db

class Shopweekhistory1(db.Model):

        __tablename__ = "shopweekhistory1"

        id = db.Column(db.Integer, primary_key = True)

        weekid = db.Column(db.Integer) # foreign key with week admin table

        graphtypeid = db.Column(db.Integer)

        value = db.Column(db.BLOB)

        sync = db.Column(db.Integer)


        def to_dict(self):
                return dict(
                        weekid = self.weekid,
                        graphtypeid = self.graphtypyeid,
                        value = self.value,
                        sync = self.sync,
                        id = self.id
                )

        def __repr__(self):
                return '<Shopweekhistory1 %r>' % (self.id)
