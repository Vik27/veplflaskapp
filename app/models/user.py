from app import db, bcrypt

class User(db.Model):

    __tablename__ = "user"

    id = db.Column(db.Integer, primary_key = True)
    
    username = db.Column(db.String(30))
    
    password = db.Column(db.String(256))
    
    contact_email = db.Column(db.String(50))

    role = db.Column(db.Enum('Admin', 'Smgr', 'Mgr', 'Eng'))

    responsibility = db.Column(db.Enum('Electrical', 'Electronics', 'Both'))

    phoneNo = db.Column(db.BigInteger)

    businessId = db.Column(db.Integer,db.ForeignKey('business.id'))
    

    def __init__(self, username, password, contact_email, role, responsibility, phoneNo, businessId):
        self.username = username
        self.password = bcrypt.generate_password_hash(password)
        self.contact_email = contact_email
        self.role = role
        self.responsibility = responsibility
        self.phoneNo = phoneNo
        self.businessId = businessId


    def to_dict(self):
        return dict(
            username = self.username,
            password = self.password,
            contact_email = self.contact_email,
            role = self.role,
            responsibility = self.responsibility,
            phoneNo = self.phoneNo,
            id = self.id,
            businessId = self.businessId
        )

    def __repr__(self):
        return '<User %r>' % (self.username)


    @property
    def is_authenticated(self):
        return True

    @property
    def is_active(self):
        return True

    @property
    def is_anonymous(self):
        return False

    def get_id(self):
        return unicode(self.id)