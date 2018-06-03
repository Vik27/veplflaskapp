from app import db

class Shopcurrentday1(db.Model):

        __tablename__ = "shopcurrentday1"

        id = db.Column(db.Integer, primary_key = True)

        graphtypeid = db.Column(db.Integer)

        value = db.Column(db.BLOB)

        sync = db.Column(db.Integer)


        def to_dict(self):
                return dict(
                        graphtypeid = self.graphtypyeid,
                        value = self.value,
                        sync = self.sync,
                        id = self.id
                )

        def __repr__(self):
                return '<Shopcurrentday1 %r>' % (self.id)
