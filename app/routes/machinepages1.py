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

from app.models import machinecurrentshift1, machinecurrentshift2
from app.models import machineshifthistory1, machineshifthistory2
from sqlalchemy import func

from threading import Thread
import pprint


def shiftsForMachines(machineId):
	shift1=datetime.time(hour=7, minute=0, second=0)
	shift2=datetime.time(hour=15, minute=30, second=0)
	shift3=datetime.time(hour=23, minute=59, second=59, microsecond=999999)
	return (shift1, shift2, shift3)


def getshift(timey, machineId):
	print timey
	shift1, shift2, shift3 = shiftsForMachines(machineId)
	if timey.time()>=shift1 and timey.time()<shift2:
		start=timey.replace(hour=shift1.hour, minute=shift1.minute, second=0, microsecond=0)
		shiftId=1
	elif timey.time()>=shift2 and timey.time()<=shift3:
		start=timey.replace(hour=shift2.hour, minute=shift2.minute, second=0, microsecond=0)
		shiftId=2
	else:
		start=timey.replace(hour=0, minute=0, second=0, microsecond=0)
		shiftId=3
	
	return (start, shiftId)


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

	currenttime = datetime.datetime.now()

	if duration == '1':
		if period == '1':
			# current shift
			# print 'current shift'
			if id==1:
				_machinecurrentshift = machinecurrentshift1.Machinecurrentshift1
			if id==2:
				_machinecurrentshift = machinecurrentshift2.Machinecurrentshift2

			value = json.loads(_machinecurrentshift.query.get(1).value)
			curst, cursh = getshift(currenttime, id)
			if cursh == 3:
				curshdate = currenttime.replace(hour=0, minute=0, second=0, microsecond=0)
				curshdate = curshdate - datetime.timedelta(days=1)
			else:
				curshdate = currenttime.replace(hour=0, minute=0, second=0, microsecond=0)
			
			toret = {'data': value, 'machineId': id, 'shift': cursh, 'date': curshdate.isoformat()}

		if period == '2':
			# previous shift
			# print 'previous shift'
			if id==1:
				_machineshifthistory = machineshifthistory1.Machineshifthistory1
			if id==2:
				_machineshifthistory = machineshifthistory2.Machineshifthistory2
			
			curst, cursh = getshift(currenttime, id)
			shifts = [1,2,3] # shifttime ids
			ind = shifts.index(cursh)
			prevsh = shifts[ind-1]

			if cursh == 1 or cursh == 3:
				prevdt = currenttime.replace(hour=0, minute=0, second=0, microsecond=0)
				prevdt = prevdt - datetime.timedelta(days=1)
			if cursh == 2:
				prevdt = currenttime.replace(hour=0, minute=0, second=0, microsecond=0)

			histrow = _machineshifthistory.query.filter\
			(_machineshifthistory.shifttimeid == prevsh).filter\
			(_machineshifthistory.date == prevdt).one_or_none()
			if histrow:
				value = json.loads(histrow.value)
			else:
				value = None

			toret = {'data': value, 'machineId': id, 'shift': prevsh, 'date': prevdt.isoformat()}

		if period == '3' or period == '4':
			# custom shift
			# print 'custom shift'
			if id==1:
				_machineshifthistory = machineshifthistory1.Machineshifthistory1
			if id==2:
				_machineshifthistory = machineshifthistory2.Machineshifthistory2
			
			custdate = custom['date']
			# print date
			custsh = int(custom['shift'])
			# print shift
			custdate = datetime.datetime.strptime(custdate, '%Y-%m-%dT%H:%M:%S.%fZ')
			# print custdate
			custdate = custdate.replace(hour=0, minute=0, second=0, microsecond=0)	

			histrow = _machineshifthistory.query.filter\
			(_machineshifthistory.shifttimeid == custsh).filter\
			(_machineshifthistory.date == custdate).one_or_none()
			if histrow:
				value = json.loads(histrow.value)
			else:
				value = None

			toret = {'data': value, 'machineId': id, 'shift': custsh, 'date': custdate.isoformat()}

		if toret['shift'] == 1:
			toret['shift'] = 'A'
		elif toret['shift'] == 2:
			toret['shift'] = 'B'
		else:
			toret['shift'] = 'C'

		print toret['shift']
		print toret['date']
		print toret['machineId']



	# 		shift1, shift2, shift3 = shiftsForMachines(id)
	# 		if shift == '1':
	# 			timey = datetime.datetime(rqdt.year, rqdt.month, rqdt.day, shift2.hour, shift2.minute, 0)
	# 			timey = timey-datetime.timedelta(seconds=1)
	# 		elif shift == '2':
	# 			timey = datetime.datetime(rqdt.year, rqdt.month, rqdt.day, shift3.hour, shift3.minute, 0)
	# 			timey = timey-datetime.timedelta(seconds=1)
	# 		else:
	# 			timey = datetime.datetime(rqdt.year, rqdt.month, rqdt.day, shift3.hour, shift3.minute, 0)
	# 			secs = (24*60*60) - (datetime.datetime.combine(datetime.date.today(), shift3) - datetime.datetime.combine(datetime.date.today(), shift1)).seconds
	# 			timey = timey+datetime.timedelta(seconds=secs-1)
	# 		print timey
	# 		toret = summaryItems(timey, id) # timey is requested custom shift end time - 1 minute

	# # print toret

	# return jsonify(toret), 200


	# if id==1:
	# 	value = json.loads(machinecurrentshift1.Machinecurrentshift1.query.get(1).value)
	# else:
	# 	value = json.loads(machinecurrentshift2.Machinecurrentshift2.query.get(1).value)

	

	return jsonify(toret), 200
