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
from app.models import productionlog, cyclelog, aliverow
# from email.mime.text import MIMEText

from threading import Thread
import boto3
import pprint

import datetime as dt

@app.route('/noviga/floorviews', methods = ['GET'])
@access.log_required1
def get_floorview_data():

	status = productionlog.Productionlog.query.order_by(productionlog.Productionlog.id.desc()).first().status

	lastAlive = aliverow.Aliverow.query.get(1).timestamp
	if not lastAlive:
		lastAlive = datetime.now()-dt.timedelta(minutes=1)
	currentTime = datetime.now()
	timeElapsed = (currentTime-lastAlive).total_seconds()
	if timeElapsed > 120:
		status = 'disconnected'

	lastAlive = int(lastAlive.strftime("%s"))*1000

	prodCount = cyclelog.Cyclelog.query.order_by(cyclelog.Cyclelog.id.desc()).first().count

	machines = [
		{'id': 1, 'machineNo': '28035', 'make': 'Asian Plastic', 'machineName': 'SM-1400V', 'controller': 'CDC2000WIN', 'target': 420, 'prodCount': prodCount, 'status': status, 'lastAlive': lastAlive},
		{'id': 2, 'machineNo': '456', 'make': 'Asian Plastic', 'machineName': 'SM-1800', 'controller': 'CDC3000', 'target': 450, 'prodCount': 300, 'status': 'disconnected', 'lastAlive': 0},
		{'id': 3, 'machineNo': '789', 'make': 'Asian Plastic', 'machineName': 'SM-2500', 'controller': 'CDC2000WIN', 'target': 420, 'prodCount': 140, 'status': 'disconnected', 'lastAlive': 0},
		{'id': 4, 'machineNo': '234', 'make': 'Asian Plastic', 'machineName': 'SM-1700', 'controller': 'CDC2000', 'target': 350, 'prodCount': 280, 'status': 'disconnected', 'lastAlive': 0},
		{'id': 5, 'machineNo': '567', 'make': 'Haitian', 'machineName': 'SM-1100', 'controller': 'MPC09', 'target': 400, 'prodCount': 400, 'status': 'disconnected', 'lastAlive': 0},
	]

	filteropts = {
		'mcstatus': [
			{'id': 1, 'name': 'on'},
			{'id': 2, 'name': 'off'},
			{'id': 3, 'name': 'disconnected'},
		],
		'downtime': [
			{'id': 1, 'name': '< 5 minutes'},
			{'id': 2, 'name': '< 10 minutes'},
			{'id': 3, 'name': '< 20 minutes'},
			{'id': 4, 'name': '< 60 minutes'},
			{'id': 5, 'name': '>= 60 minutes'},
		],
		'alarm': [
			{'id': 1, 'name': '< 3'},
			{'id': 2, 'name': '< 5'},
			{'id': 3, 'name': '< 10'},
			{'id': 4, 'name': '< 15'},
			{'id': 5, 'name': '>= 15'},
		],
		'achievement': [
			{'id': 1, 'name': '> 50%'},
			{'id': 2, 'name': '> 60%'},
			{'id': 3, 'name': '> 70%'},
			{'id': 4, 'name': '> 80%'},
			{'id': 5, 'name': '> 90%'},
		],
		'make': [
			{'id': 1, 'name': 'Asian Plastic'},
			{'id': 2, 'name': 'Haitian'},
		],

	}

	return jsonify({'machines': machines, 'filteropts': filteropts}), 200


@app.route('/noviga/machinerefresh', methods = ['GET'])
@access.log_required1
def machine_data_refresh():
	status = productionlog.Productionlog.query.order_by(productionlog.Productionlog.id.desc()).first().status

	lastAlive = aliverow.Aliverow.query.get(1).timestamp
	if not lastAlive:
		lastAlive = datetime.now()-dt.timedelta(minutes=1)
	currentTime = datetime.now()
	timeElapsed = (currentTime-lastAlive).total_seconds()
	if timeElapsed > 120:
		status = 'disconnected'

	lastAlive = int(lastAlive.strftime("%s"))*1000

	prodCount = cyclelog.Cyclelog.query.order_by(cyclelog.Cyclelog.id.desc()).first().count

	machines = [
		{'id': 1, 'machineNo': '28035', 'make': 'Asian Plastic', 'machineName': 'SM-1400V', 'controller': 'CDC2000WIN', 'target': 420, 'prodCount': prodCount, 'status': status, 'lastAlive': lastAlive},
		{'id': 2, 'machineNo': '456', 'make': 'Asian Plastic', 'machineName': 'SM-1800', 'controller': 'CDC3000', 'target': 450, 'prodCount': 300, 'status': 'disconnected', 'lastAlive': 0},
		{'id': 3, 'machineNo': '789', 'make': 'Asian Plastic', 'machineName': 'SM-2500', 'controller': 'CDC2000WIN', 'target': 420, 'prodCount': 140, 'status': 'disconnected', 'lastAlive': 0},
		{'id': 4, 'machineNo': '234', 'make': 'Asian Plastic', 'machineName': 'SM-1700', 'controller': 'CDC2000', 'target': 350, 'prodCount': 280, 'status': 'disconnected', 'lastAlive': 0},
		{'id': 5, 'machineNo': '567', 'make': 'Haitian', 'machineName': 'SM-1100', 'controller': 'MPC09', 'target': 400, 'prodCount': 400, 'status': 'disconnected', 'lastAlive': 0},
	]

	return jsonify({'machines': machines}), 200






