from app import app, db, mail, bcrypt
from flask import abort, jsonify, request, send_file, g, session
from datetime import datetime, date
import json
from app.functionss import access
from flask_mail import Message
import sys, os, re
from stat import S_ISREG, ST_CTIME, ST_MODE
import time
import smtplib
from app.models import cyclelog, aliverow
# from email.mime.text import MIMEText

from threading import Thread
import pprint

import datetime as dt

@app.route('/noviga/floorviews', methods = ['GET'])
@access.log_required1
def get_floorview_data():

	cycleLogEnts=cyclelog.Cyclelog.query.all()

	cycRows=[c.to_dict() for c in cycleLogEnts]

	return jsonify({'cycRows': cycRows}), 200
