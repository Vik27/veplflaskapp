from app import app, db, mail, bcrypt
from flask import abort, jsonify, request, send_file, g, session
import datetime
import json
from app.functionss import access
from flask_mail import Message
import sys, os, re
from stat import S_ISREG, ST_CTIME, ST_MODE
import time
import smtplib
from app.models import cyclelog, aliverow, cyclelognew
from app.models import machine, plant, site
from sqlalchemy import func
# from email.mime.text import MIMEText

from threading import Thread
import pprint


@app.route('/noviga/plantwisepage/summary', methods = ['GET'])
@access.log_required1
def get_plantwise_summary():
	# fetch plantwise machine layout and oee data for each entity including plants and sites

	return jsonify({'result': 'success'}), 200