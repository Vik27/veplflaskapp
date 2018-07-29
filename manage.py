# manage.py

from flask_script import Manager, Server
from flask.ext.migrate import Migrate, MigrateCommand
from app import app, db

from app.models.user import User



migrate = Migrate(app, db)
manager = Manager(app)

# migrations
manager.add_command('db', MigrateCommand)


@manager.command
def create_db():
    """Creates the db tables."""
    db.create_all()


@manager.command
def drop_db():
    """Drops the db tables."""
    db.drop_all()


@manager.command
def create_admin():
    """Creates the admin user."""
    db.session.add(User(username='admin', password='qwe123', contact_email='admin', designation='Admin', businessId=None, responsibility='Both', phoneNo= 
        9972111722, departmentid=None, name='admin'))
    db.session.commit()


@manager.command
def create_user():
    db.session.add(User(username='user', password='user', contact_email='user', role='user'))
    db.session.commit()


if __name__ == '__main__':
    manager.run()
