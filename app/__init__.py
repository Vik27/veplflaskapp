# app/_init_.py

from flask import Flask, request
from flask.ext.bcrypt import Bcrypt
from flask.ext.sqlalchemy import SQLAlchemy, event, before_models_committed, models_committed
from app.config import BaseConfig
from flask.ext.login import LoginManager
from sqlalchemy import and_, orm, inspect
from sqlalchemy.orm import relationship, class_mapper, backref
import time
import json
from flask_mail import Mail
from flask_mail import Message




app = Flask(__name__)
app.config.from_object(BaseConfig)

mail = Mail(app)

bcrypt = Bcrypt(app)
db = SQLAlchemy(app)

lm = LoginManager()
lm.init_app(app)
lm.login_view = 'login'


from app.models import user
from app.models import business

from app.routes import index
from app.routes import authentication
from app.routes import users
from app.routes import create_admin_entries

from app.functionss import access



