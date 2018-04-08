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

# from flask_cors import CORS


app = Flask(__name__)
app.config.from_object(BaseConfig)
# CORS(app)
mail = Mail(app)

bcrypt = Bcrypt(app)
db = SQLAlchemy(app)

lm = LoginManager()
lm.init_app(app)
lm.login_view = 'login'


from app.models import user
from app.models import business
from app.models import cyclelog
# from app.models import productionlog
# from app.models import downtimereason
# from app.models import failuremode
# from app.models import dtlog
# from app.models import currentdata
from app.models import aliverow
from app.models import shiftstat


from app.routes import index
from app.routes import authentication
from app.routes import users
from app.routes import create_admin_entries
from app.routes import localcommunications
from app.routes import floorviews
from app.routes import machinepages


from app.functionss import access



