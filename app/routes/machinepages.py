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
from app.models import productionlog, cyclelog, alarmlog
from sqlalchemy import func
# from email.mime.text import MIMEText

# from threading import Thread
# import boto3
# import pprint

def conTime(timestamp):
	return int(timestamp.strftime("%s"))*1000 + 19800000

def conTimeM1(timestamp):
	return int(timestamp.strftime("%s"))*1000 + 19799000

def conTimeP1(timestamp):
	return int(timestamp.strftime("%s"))*1000 + 19801000

@app.route('/noviga/machinepages/operation', methods = ['GET'])
@access.log_required1
def get_machine_data_operation():
	timey = datetime.datetime.now()
	vv = timey - datetime.timedelta(hours=24)
	cycents=cyclelog.Cyclelog.query.filter(cyclelog.Cyclelog.timestamp.between(vv, timey)).all()
	
	xx = conTime(vv)
	yy = conTimeM1(cycents[0].timestamp)
	onoffdata=[ [xx, 0], [yy, 0] ]
	
	for i in range(len(cycents)-1):
		if ((cycents[i+1].timestamp - cycents[i].timestamp).total_seconds()) > (cycents[i].cycleTime + 600.):
			# do something
			onoffdata.append([conTime(cycents[i].timestamp), 1])
			onoffdata.append([conTimeP1(cycents[i].timestamp), 0])
			onoffdata.append([conTimeM1(cycents[i+1].timestamp), 0])
		else:
			# do something else
			onoffdata.append([conTime(cycents[i].timestamp), 1])

	prodCount = db.session.query(func.count(cyclelog.Cyclelog.id))\
	.filter(cyclelog.Cyclelog.timestamp.between(vv, timey)).scalar()
	
	alarmCount = db.session.query(func.count(alarmlog.Alarmlog.id))\
	.filter(alarmlog.Alarmlog.alarmCode < 1300)\
	.filter((alarmlog.Alarmlog.startTimestamp.between(vv, timey))\
	 | (alarmlog.Alarmlog.stopTimestamp.between(vv,timey))).scalar()

	cTime = db.session.query(func.avg(cyclelog.Cyclelog.cycleTime).label('average'))\
	.filter(cyclelog.Cyclelog.timestamp.between(vv, timey)).scalar()

	return jsonify({'result': onoffdata, 'prodCount': prodCount, 'alarmCount': alarmCount, 'cycleTime': cTime}), 200


@app.route('/noviga/machinepages/temperature', methods = ['GET'])
@access.log_required1
def get_machine_data_temperature():
	timey = datetime.datetime.now()
	vv = timey - datetime.timedelta(hours=24)
	cycents=cyclelog.Cyclelog.query.filter(cyclelog.Cyclelog.timestamp.between(vv, timey)).all()
	
	xx = conTime(vv)
	yy = conTimeM1(cycents[0].timestamp)
	
	T2=[ [xx, 0], [yy, 0] ]
	T3=[ [xx, 0], [yy, 0] ]
	T4=[ [xx, 0], [yy, 0] ]
	T5=[ [xx, 0], [yy, 0] ]
	T6=[ [xx, 0], [yy, 0] ]
	T7=[ [xx, 0], [yy, 0] ]
	
	for i in range(len(cycents)-1):
		if ((cycents[i+1].timestamp - cycents[i].timestamp).total_seconds()) > (cycents[i].cycleTime + 600.):
			# do something
			
			T2.append([conTime(cycents[i].timestamp), cycents[i].T2])
			T2.append([conTimeP1(cycents[i].timestamp), 0])
			T2.append([conTimeM1(cycents[i+1].timestamp), 0])
			
			T3.append([conTime(cycents[i].timestamp), cycents[i].T3])
			T3.append([conTimeP1(cycents[i].timestamp), 0])
			T3.append([conTimeM1(cycents[i+1].timestamp), 0])
			
			T4.append([conTime(cycents[i].timestamp), cycents[i].T4])
			T4.append([conTimeP1(cycents[i].timestamp), 0])
			T4.append([conTimeM1(cycents[i+1].timestamp), 0])
			
			T5.append([conTime(cycents[i].timestamp), cycents[i].T5])
			T5.append([conTimeP1(cycents[i].timestamp), 0])
			T5.append([conTimeM1(cycents[i+1].timestamp), 0])
			
			T6.append([conTime(cycents[i].timestamp), cycents[i].T6])
			T6.append([conTimeP1(cycents[i].timestamp), 0])
			T6.append([conTimeM1(cycents[i+1].timestamp), 0])
			
			T7.append([conTime(cycents[i].timestamp), cycents[i].T7])
			T7.append([conTimeP1(cycents[i].timestamp), 0])
			T7.append([conTimeM1(cycents[i+1].timestamp), 0])
			
		else:
			# do something else
			T2.append([conTime(cycents[i].timestamp), cycents[i].T2])
			T3.append([conTime(cycents[i].timestamp), cycents[i].T3])
			T4.append([conTime(cycents[i].timestamp), cycents[i].T4])
			T5.append([conTime(cycents[i].timestamp), cycents[i].T5])
			T6.append([conTime(cycents[i].timestamp), cycents[i].T6])
			T7.append([conTime(cycents[i].timestamp), cycents[i].T7])

	return jsonify({'T2': T2, 'T3': T3, 'T4': T4, 'T5': T5, 'T6': T6, 'T7': T7}), 200



@app.route('/noviga/machinepages/condition', methods = ['GET'])
@access.log_required1
def get_machine_data_condition():

	with open('/home/ubuntu/savedpcrns/data.txt') as json_file:  
		data = json.load(json_file)

	# print data['screwPosition']
	tl=[float(x) for x in data['timeArray']]
	sp=[int(x) for x in data['screwPosition']]
	op=[int(x) for x in data['oilPressure']]

	screwPosition=list(zip(tl,sp))
	oilPressure=list(zip(tl,op))



	mcdataSend={'startTime': data['startTime'], 'injectionStart':data['injectionStart'], 
				'holdStart':data['holdStart'], 'plastStart':data['plastStart'], 
				'coolStart':data['coolStart'],  'endTime': data['endTime'],
				'screwPosition':screwPosition,
				'oilPressure':oilPressure,
			}


	return jsonify({'result': 'success', 'mcdata':mcdataSend})


@app.route('/noviga/machinepages/timer', methods = ['GET'])
@access.log_required1
def get_machine_data_timer():
	timey = datetime.datetime.now()
	vv = timey - datetime.timedelta(hours=24)
	cycents=cyclelog.Cyclelog.query.filter(cyclelog.Cyclelog.timestamp.between(vv, timey)).all()
	
	xx = conTime(vv)
	yy = conTimeM1(cycents[0].timestamp)
	
	fillTime=[ [xx, 0], [yy, 0] ]
	clampOpenTime=[ [xx, 0], [yy, 0] ]
	clampCloseTime=[ [xx, 0], [yy, 0] ]
	cycleTime=[ [xx, 0], [yy, 0] ]
	
	for i in range(len(cycents)-1):
		if ((cycents[i+1].timestamp - cycents[i].timestamp).total_seconds()) > (cycents[i].cycleTime + 600.):
			# do something
			
			fillTime.append([conTime(cycents[i].timestamp), cycents[i].fillTime])
			fillTime.append([conTimeP1(cycents[i].timestamp), 0])
			fillTime.append([conTimeM1(cycents[i+1].timestamp), 0])
			
			clampOpenTime.append([conTime(cycents[i].timestamp), cycents[i].clampOpenTime])
			clampOpenTime.append([conTimeP1(cycents[i].timestamp), 0])
			clampOpenTime.append([conTimeM1(cycents[i+1].timestamp), 0])
			
			clampCloseTime.append([conTime(cycents[i].timestamp), cycents[i].clampCloseTime])
			clampCloseTime.append([conTimeP1(cycents[i].timestamp), 0])
			clampCloseTime.append([conTimeM1(cycents[i+1].timestamp), 0])
			
			cycleTime.append([conTime(cycents[i].timestamp), cycents[i].cycleTime])
			cycleTime.append([conTimeP1(cycents[i].timestamp), 0])
			cycleTime.append([conTimeM1(cycents[i+1].timestamp), 0])
						
		else:
			# do something else
			fillTime.append([conTime(cycents[i].timestamp), cycents[i].fillTime])
			clampOpenTime.append([conTime(cycents[i].timestamp), cycents[i].clampOpenTime])
			clampCloseTime.append([conTime(cycents[i].timestamp), cycents[i].clampCloseTime])
			cycleTime.append([conTime(cycents[i].timestamp), cycents[i].cycleTime])

	return jsonify({'fillTime': fillTime, 'clampOpenTime': clampOpenTime, 'clampCloseTime': clampCloseTime, 'cycleTime': cycleTime}), 200







