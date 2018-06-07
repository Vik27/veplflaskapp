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

### setting models (business / plant / shop / machine specific) also used for reporting
from app.models import breaktimetable1 # machine - planned production breaks
from app.models import breaktimetable2
from app.models import downtimereason # business specific (for SAP)
from app.models import dtinterlock1 # machine - interlock settings
from app.models import dtinterlock2
from app.models import shifttime # plant - shift timings
from app.models import partmodel1 # machine - parts run on the machine
from app.models import partmodel2
from app.models import failuremode1 # machine - failuremodes (rejection ng reasons)
from app.models import failuremode2
from app.models import machineusermap # change allowed operators on machines

### admin models
from app.models import user
from app.models import business
from app.models import graphtype
from app.models import interlockfrequencytype
from app.models import machine
from app.models import shop
from app.models import plant
from app.models import department
from app.models import weekcalendar

### reporting tables (machine level)
# live tables for shift, day, week
from app.models import machinecurrentday1
from app.models import machinecurrentday2
from app.models import machinecurrentshift1
from app.models import machinecurrentshift2
from app.models import machinecurrentweek1
from app.models import machinecurrentweek2
from app.models import machinecurrentweek2
# history tables for shift, day, week
from app.models import machinedayhistory1
from app.models import machinedayhistory2
from app.models import machineshifthistory1
from app.models import machineshifthistory2
from app.models import machineweekhistory1
from app.models import machineweekhistory2

### reporting tables (plant level)
# live tables for shift, day, week - plant
from app.models import plantcurrentday1
from app.models import plantcurrentshift1
from app.models import plantcurrentweek1
# history tables for shift, day, week - plant
from app.models import plantdayhistory1
from app.models import plantshifthistory1
from app.models import plantweekhistory1

### reporting tables (shop level)
# live tables for shift, day, week - shop
from app.models import shopcurrentday1
from app.models import shopcurrentshift1
from app.models import shopcurrentweek1
# history tables for shift, day, week - shop
from app.models import shopdayhistory1
from app.models import shopshifthistory1
from app.models import shopweekhistory1


from app.routes import localcommunications

from app.functionss import access



