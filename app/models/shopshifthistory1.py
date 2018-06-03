from app import db

class Shopshifthistory1(db.Model):

        __tablename__ = "shopshifthistory1"

        id = db.Column(db.Integer, primary_key = True)

        date = db.Column(db.DateTime)

        shifttimeid = db.Column(db.Integer) # shifttimeid contains plant id as foreign key

        graphtypeid = db.Column(db.Integer)

        value = db.Column(db.BLOB)

        sync = db.Column(db.Integer)


        def to_dict(self):
                return dict(
                        date = self.date,
                        shifttimeid = self.shifttimeid,
                        graphtypeid = self.graphtypyeid,
                        value = self.value,
                        sync = self.sync,
                        id = self.id
                )

        def __repr__(self):
                return '<Shopshifthistory1 %r>' % (self.id)
