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
from app.models import cyclelog, aliverow
# from email.mime.text import MIMEText

from threading import Thread
import pprint

import datetime as dt
# def conTime(timestamp):
# 	return int(timestamp.strftime("%s"))*1000

shift1=datetime.time(hour=7, minute=0, second=0)

shift2=datetime.time(hour=15, minute=30, second=0)
shift3=datetime.time(hour=23, minute=59, second=59)


def getcurrentPlannedDowntime(shiftId, timeNow):

	plannedDowntime=[[[timeNow.replace(hour=8, minute=0, second=0),timeNow.replace(hour=8, minute=10, second=0)],
				[timeNow.replace(hour=11, minute=0, second=0),timeNow.replace(hour=11, minute=30, second=0)],
				[timeNow.replace(hour=13, minute=0, second=0),timeNow.replace(hour=13, minute=10, second=0)]],
				[[timeNow.replace(hour=17, minute=0, second=0),timeNow.replace(hour=17, minute=10, second=0)],
				[timeNow.replace(hour=19, minute=30, second=0),timeNow.replace(hour=20, minute=0, second=0)],
				[timeNow.replace(hour=22, minute=0, second=0),timeNow.replace(hour=22, minute=10, second=0)]],
				[[timeNow.replace(hour=1, minute=0, second=0),timeNow.replace(hour=1, minute=10, second=0)],
				[timeNow.replace(hour=4, minute=0, second=0),timeNow.replace(hour=4, minute=10, second=0)]]]
				
	timePD=0

	for x in plannedDowntime[shiftId-1]:
		if timeNow>x[1]:
			# print (x[1]-x[0])

			timePD += (x[1]-x[0]).total_seconds()

		elif timeNow>x[0] and timeNow<x[1]:
			timePD += (timeNow-x[0]).total_seconds()
		else:
			pass

	return timePD



def conTime(timestamp):
	return int((timestamp - datetime.datetime(1970,1,1)).total_seconds())*1000

@app.route('/noviga/machinepages/summary', methods = ['GET'])
@access.log_required1
def get_mc_summary():

	timey= datetime.datetime.now()
	timey= datetime.datetime.now()-datetime.timedelta(hours=20)
	# timey= datetime.datetime.now()+datetime.timedelta(hours=5, minutes=30)


	if timey.time()>shift1 and timey.time()<shift2:
		vv=timey.replace(hour=7, minute=0, second=0)
		shiftId=1

	elif timey.time()>shift2 and timey.time()<shift3:
		vv=timey.replace(hour=15, minute=30, second=0)
		shiftId=2
	else:
		vv=timey.replace(hour=0, minute=0, second=0)
		shiftId=3

	print shiftId
	vvstr=timey.strftime('%Y-%b-%d %H:%M:%S')
	print 'timenow:'+ vvstr

	currentPlannedDowntime=getcurrentPlannedDowntime(shiftId, timey)

	cycents=cyclelog.Cyclelog.query.filter(cyclelog.Cyclelog.timestamp.between(vv, timey)).order_by(cyclelog.Cyclelog.timestamp.asc()).all()


	print len(cycents)

	# for x in cycents:
	# 	print x.timestamp
	# 	print x.timestamp.strftime("%s")
	# 	raw_input("next")

	xx = conTime(vv)

	yy = conTime(cycents[0].timestamp)
	onoffdata=[ [xx, 0], [yy, 0] ]
	ondata=[ [xx, 0], [yy, 0] ]
	offdata=[ [xx, 0],[xx, 1], [yy, 1], [yy, 0] ]
	downtime=yy-xx

	for i in range(len(cycents)-1):
		if ((cycents[i+1].timestamp - cycents[i].timestamp).total_seconds()) > 60.:
			# do something
			downtime=downtime+((cycents[i+1].timestamp-cycents[i].timestamp).total_seconds()*1000)
			ondata.append([conTime(cycents[i].timestamp), 1])
			ondata.append([conTime(cycents[i].timestamp), 0])
			offdata.append([conTime(cycents[i].timestamp), 0])
			offdata.append([conTime(cycents[i].timestamp), 1])
			offdata.append([conTime(cycents[i+1].timestamp), 1])
			offdata.append([conTime(cycents[i+1].timestamp), 0])
			ondata.append([conTime(cycents[i+1].timestamp), 0])
			# onoffdata.append([conTimeM1(cycents[i+1].timestamp), 0])
		else:
			# do something else
			ondata.append([conTime(cycents[i].timestamp), 1])


	totalRed=downtime/1000.0
	calenderTime=(timey-vv).total_seconds()

	totalproductionTime=calenderTime-currentPlannedDowntime
	totalOKTime=calenderTime-totalRed

	availability=(totalOKTime*1.0/totalproductionTime)

	stdProductionRate=(1400.0/27600)
	actualProductionRate=(cycents[-1].totalproduction*1.0/totalOKTime)
	performance=(actualProductionRate/stdProductionRate)
	
	quality=(cycents[-1].okcount*1.0/cycents[-1].totalproduction)

	oee=availability*performance*quality

	downtime=(totalRed-currentPlannedDowntime)/60.0

	return jsonify({'ondata': ondata, 'offdata': offdata, 'downtime':downtime,'okcount':cycents[-1].okcount,
					'totalCount':cycents[-1].totalproduction, 'oee':oee*100,
					'availability': availability*100, 'performance':performance*100, 'quality':quality*100,
					'totalOKTime':totalOKTime, 'totalproductionTime':totalproductionTime,
					'stdProductionRate':stdProductionRate, 'actualProductionRate':actualProductionRate,
					'unplannedDowntime':downtime*60.0,'plannedDowntime':currentPlannedDowntime,
					}), 200
