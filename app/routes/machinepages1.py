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

from app.models import machinecurrentshift1,machinecurrentshift2
# from app.models import cyclelog, aliverow, cyclelognew, cyclelognew2
from sqlalchemy import func
# from email.mime.text import MIMEText

from threading import Thread
import pprint


def shiftsForMachines(machineId):
	shift1=datetime.time(hour=7, minute=0, second=0)
	shift2=datetime.time(hour=15, minute=30, second=0)
	shift3=datetime.time(hour=23, minute=59, second=59)
	return (shift1, shift2, shift3)


def getshift(timey, machineId):
	print timey
	shift1, shift2, shift3 = shiftsForMachines(machineId)
	if timey.time()>=shift1 and timey.time()<shift2:
		start=timey.replace(hour=shift1.hour, minute=shift1.minute, second=0)
		shiftId=1
	elif timey.time()>=shift2 and timey.time()<shift3:
		start=timey.replace(hour=shift2.hour, minute=shift2.minute, second=0)
		shiftId=2
	else:
		bound1=timey.replace(hour=0, minute=0, second=0, microsecond=0)
		bound2=timey.replace(hour=1, minute=30, second=0, microsecond=0)
		if bound1 <= timey <= bound2:
			start=timey.replace(hour=shift3.hour, minute=shift3.minute, second=0)
			start=start-datetime.timedelta(hours=24)
		else:
			start=timey.replace(hour=shift3.hour, minute=shift3.minute, second=0)
		shiftId=3
	
	return (start, shiftId)


@app.route('/noviga/machinepages/<int:id>/timefilter', methods = ['GET'])
@access.log_required1
def get_mc_timefilter_data(id):
	if id==1:
		value = json.loads(machinecurrentshift1.Machinecurrentshift2.query.get(1).value)
	else:
		value = json.loads(machinecurrentshift2.Machinecurrentshift2.query.get(1).value)

	st,sh = getshift(datetime.datetime.now(),id)
	return jsonify({'data': value, 'machineId': id, 'shift': sh}), 200
