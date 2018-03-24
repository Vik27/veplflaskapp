from app import db
from app.models.user import User

# insert data
db.session.add(User("admin", "admin", "admin", "admin"))

# commit the changes
db.session.commit()
