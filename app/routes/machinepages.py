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
from app.models import cyclelog, aliverow, cyclelognew, cyclelognew2
from sqlalchemy import func
# from email.mime.text import MIMEText

from threading import Thread
import pprint

# import datetime as dt
# def conTime(timestamp):
# 	return int(timestamp.strftime("%s"))*1000

# shift1=datetime.time(hour=7, minute=0, second=0)
# shift2=datetime.time(hour=15, minute=30, second=0)
# shift3=datetime.time(hour=23, minute=59, second=59)

def shiftsForMachines(machineId):
	if machineId == 1:
		shift1=datetime.time(hour=1, minute=30, second=0)
		shift2=datetime.time(hour=10, minute=00, second=0)
		shift3=datetime.time(hour=18, minute=30, second=0)
	else:
		shift1=datetime.time(hour=1, minute=30, second=0)
		shift2=datetime.time(hour=9, minute=30, second=0)
		shift3=datetime.time(hour=17, minute=30, second=0)

	return (shift1, shift2, shift3)


def getshift(timey, machineId):
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


def getcurrentPlannedDowntime(shiftId, timeNow, machineId):
	if machineId == 1:
		plannedDowntime=[[[timeNow.replace(hour=2, minute=30, second=0),timeNow.replace(hour=2, minute=40, second=0)],
		[timeNow.replace(hour=4, minute=30, second=0),timeNow.replace(hour=4, minute=40, second=0)],
		[timeNow.replace(hour=5, minute=30, second=0),timeNow.replace(hour=6, minute=0, second=0)],
		[timeNow.replace(hour=7, minute=30, second=0),timeNow.replace(hour=7, minute=40, second=0)]],
		[[timeNow.replace(hour=10, minute=00, second=0),timeNow.replace(hour=10, minute=10, second=0)],
		[timeNow.replace(hour=11, minute=30, second=0),timeNow.replace(hour=11, minute=40, second=0)],
		[timeNow.replace(hour=14, minute=0, second=0),timeNow.replace(hour=14, minute=30, second=0)],
		[timeNow.replace(hour=16, minute=30, second=0),timeNow.replace(hour=16, minute=40, second=0)]],
		[[timeNow.replace(hour=19, minute=30, second=0),timeNow.replace(hour=19, minute=40, second=0)],
		[timeNow.replace(hour=22, minute=30, second=0),timeNow.replace(hour=22, minute=40, second=0)]]]
	else:
		plannedDowntime=[[[timeNow.replace(hour=3, minute=30, second=0),timeNow.replace(hour=3, minute=40, second=0)],
		[timeNow.replace(hour=6, minute=0, second=0),timeNow.replace(hour=6, minute=30, second=0)]],
		[[timeNow.replace(hour=10, minute=30, second=0),timeNow.replace(hour=10, minute=40, second=0)],
		[timeNow.replace(hour=13, minute=30, second=0),timeNow.replace(hour=14, minute=0, second=0)]],
		[[timeNow.replace(hour=19, minute=30, second=0),timeNow.replace(hour=19, minute=40, second=0)]]]
		
	timePD=0
	for x in plannedDowntime[shiftId-1]:
		if timeNow>x[1]:
			timePD += (x[1]-x[0]).total_seconds()
		elif timeNow>x[0] and timeNow<x[1]:
			timePD += (timeNow-x[0]).total_seconds()
		else:
			pass
	return timePD


def conTime(timestamp):
	timestamp = timestamp+datetime.timedelta(hours=5, minutes=30)
	return int((timestamp - datetime.datetime(1970,1,1)).total_seconds())*1000


def getStdProductionRate(machineId):
	if machineId == 1:
		stdProductionRate = 1400./27000.
	else:
		stdProductionRate = 80./3600.
	return stdProductionRate


def summaryItems(timey, machineId):

	start, shiftId = getshift(timey, machineId)
	currentPlannedDowntime=getcurrentPlannedDowntime(shiftId, timey, machineId)
	stdProductionRate = getStdProductionRate(machineId)

	if machineId == 1:
		cycents=cyclelognew.Cyclelognew.query\
		.filter(cyclelognew.Cyclelognew.timestamp.between(start, timey))\
		.filter(cyclelognew.Cyclelognew.count != 0).all()
	else:
		cycents=cyclelognew2.Cyclelognew2.query\
		.filter(cyclelognew2.Cyclelognew2.timestamp.between(start, timey))\
		.filter(cyclelognew2.Cyclelognew2.count != 0).all()

	if machineId == 1:
		dummyok = cyclelognew.Cyclelognew.query\
		.filter(cyclelognew.Cyclelognew.timestamp.between(start, timey))\
		.filter(cyclelognew.Cyclelognew.faultCode == 2)\
		.filter(cyclelognew.Cyclelognew.count.in_([1,2])).all()
		dok = len(dummyok)
	else:
		dok = 0

	if len(cycents) == 0:
		# no component is produced, i.e. till now no production has happened
		xx = conTime(start)
		yy = conTime(timey)
		offdata = [ [xx, 0],[xx, 1], [yy, 1], [yy, 0] ]
		ondata = [[xx,0], [yy, 0]]
		downtime = (((yy - xx)/1000.) - currentPlannedDowntime)/60.
		availability = 0
		performance = 0
		quality = 0
		oee = 0
		totalOKTime = 0
		totalCount = 0
		okcount = 0
		totalproductionTime = 0
		actualProductionRate = 0
		boltReject = 0
		perfReject = 0
		leakReject = 0
		totalReject = 0
		dok = 0
		totalProduction = 0
	else:
		# at least one component is produced whether good or bad
		xx = conTime(start)
		yy = conTime(cycents[0].timestamp)
		ondata=[ [xx, 0], [yy, 0] ]
		offdata=[ [xx, 0],[xx, 1], [yy, 1], [yy, 0] ]
		downtime=yy-xx

		for i in range(len(cycents)-1):
			if ((cycents[i+1].timestamp - cycents[i].timestamp).total_seconds()) > 180.:
				downtime=downtime+((cycents[i+1].timestamp-cycents[i].timestamp).total_seconds()*1000)
				ondata.append([conTime(cycents[i].timestamp), 1])
				ondata.append([conTime(cycents[i].timestamp), 0])
				offdata.append([conTime(cycents[i].timestamp), 0])
				offdata.append([conTime(cycents[i].timestamp), 1])
				offdata.append([conTime(cycents[i+1].timestamp), 1])
				offdata.append([conTime(cycents[i+1].timestamp), 0])
				ondata.append([conTime(cycents[i+1].timestamp), 0])
			else:
				ondata.append([conTime(cycents[i].timestamp), 1])

		if ((timey - cycents[-1].timestamp).total_seconds()) > 180:
			downtime = downtime+((timey-cycents[-1].timestamp).total_seconds()*1000)
			ondata.append([conTime(cycents[-1].timestamp), 1])
			ondata.append([conTime(cycents[-1].timestamp), 0])
			ondata.append([conTime(timey), 0])
			offdata.append([conTime(cycents[-1].timestamp), 0])
			offdata.append([conTime(cycents[-1].timestamp), 1])
			offdata.append([conTime(timey), 1])
			offdata.append([conTime(timey), 0])
		else:
			ondata.append([conTime(cycents[-1].timestamp), 1])
			ondata.append([conTime(timey), 1])

		totalRed = downtime/1000.0
		calenderTime = (timey - start).total_seconds()
		totalproductionTime = calenderTime - currentPlannedDowntime
		totalOKTime = calenderTime - totalRed
		availability = (totalOKTime*1.0/totalproductionTime)

		totalProduction = len(cycents) - dok
		actualProductionRate=(totalProduction*1.0/totalOKTime)
		performance=(actualProductionRate/stdProductionRate)

		if machineId == 1:
			boltReject = db.session.query(func.count(cyclelognew.Cyclelognew.id))\
			.filter(cyclelognew.Cyclelognew.timestamp.between(start, timey))\
			.filter(cyclelognew.Cyclelognew.count != 0)\
			.filter(cyclelognew.Cyclelognew.faultCode == 1).scalar()
			
			perfReject = db.session.query(func.count(cyclelognew.Cyclelognew.id))\
			.filter(cyclelognew.Cyclelognew.timestamp.between(start, timey))\
			.filter(cyclelognew.Cyclelognew.count != 0)\
			.filter(cyclelognew.Cyclelognew.faultCode == 2).scalar()
			perfReject = perfReject - dok
			
			leakReject = db.session.query(func.count(cyclelognew.Cyclelognew.id))\
			.filter(cyclelognew.Cyclelognew.timestamp.between(start, timey))\
			.filter(cyclelognew.Cyclelognew.count != 0)\
			.filter(cyclelognew.Cyclelognew.faultCode == 3).scalar()
			
			totalReject = boltReject + perfReject + leakReject
		else:
			boltReject = None
			perfReject = None
			leakReject = None
			totalReject = 0
		
		okcount = totalProduction - totalReject
		okcount = 0 if okcount < 0 else okcount
		quality=(okcount*1.0/totalProduction)

		oee=availability*performance*quality

		downtime=(totalRed-currentPlannedDowntime)/60.0

	toret = {
	'ondata': ondata,
	'offdata': offdata,
	'downtime': downtime,
	'okcount': okcount,
	'totalCount': totalProduction,
	'oee': oee*100,
	'availability': availability*100,
	'performance': performance*100,
	'quality': quality*100,
	'totalOKTime': totalOKTime,
	'totalproductionTime': totalproductionTime,
	'stdProductionRate': stdProductionRate,
	'actualProductionRate': actualProductionRate,
	'unplannedDowntime': downtime*60.0,
	'plannedDowntime': currentPlannedDowntime,
	'boltReject': boltReject,
	'perfReject': perfReject,
	'leakReject': leakReject,
	'totalReject': totalReject,
	'dok': dok,
	'machineId': machineId
	}

	return toret


@app.route('/noviga/machinepages/summary', methods = ['GET'])
@access.log_required1
def get_mc_summary():

	# timey= datetime.datetime.now()
	timey= datetime.datetime.now()-datetime.timedelta(hours=200)
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


@app.route('/noviga/machinepages/<int:id>/timefilter', methods = ['GET'])
@access.log_required1
def get_mc_timefilter_data(id):
	duration = json.loads(request.args.getlist('filt')[0])['duration']
	period = json.loads(request.args.getlist('filt')[0])['period']
	custom = json.loads(request.args.getlist('custom')[0])
	print id
	print duration
	print period
	print custom

	if duration == '1':
		if period == '1':
			# current shift
			# print 'current shift'
			timey= datetime.datetime.now() #- datetime.timedelta(hours=200)
			toret = summaryItems(timey, id) # timey is current time
		elif period == '2':
			# previous shift
			# print 'previous shift'
			curt = datetime.datetime.now()
			curst, cursh = getshift(curt, id)
			timey = curst - datetime.timedelta(minutes=1)
			# print timey
			toret = summaryItems(timey, id) # timey is previous shift end time - 1 minute
		else:
			print 'custom shift'
			date = custom['date']
			shift = custom['shift']
			rqdt = datetime.datetime.fromtimestamp(date/1000.)
			print date
			print shift
			print rqdt
			shift1, shift2, shift3 = shiftsForMachines(id)
			if shift == '1':
				timey = datetime.datetime(rqdt.year, rqdt.month, rqdt.day, shift2.hour, shift2.minute, 0)
				timey = timey-datetime.timedelta(seconds=1)
			elif shift == '2':
				timey = datetime.datetime(rqdt.year, rqdt.month, rqdt.day, shift3.hour, shift3.minute, 0)
				timey = timey-datetime.timedelta(seconds=1)
			else:
				timey = datetime.datetime(rqdt.year, rqdt.month, rqdt.day, shift3.hour, shift3.minute, 0)
				secs = (24*60*60) - (datetime.datetime.combine(datetime.date.today(), shift3) - datetime.datetime.combine(datetime.date.today(), shift1)).seconds
				timey = timey+datetime.timedelta(seconds=secs-1)
			print timey
			toret = summaryItems(timey, id) # timey is requested custom shift end time - 1 minute

	# print toret

	return jsonify(toret), 200




