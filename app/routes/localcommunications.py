from app import app, db
from flask import request, jsonify, Response, render_template, g
import json
from app.functionss import access
from app.models import machinecurrentshift2, machinecurrentshift1 #, aliverow, cyclelognew, cyclelognew2, aliverow2
from app.models import machineshifthistory1, machineshifthistory2 #, aliverow, cyclelognew, cyclelognew2, aliverow2

import datetime



from sqlalchemy import Table, Column, Integer, Float, DateTime ,String, Unicode, MetaData, create_engine
from sqlalchemy.orm import mapper, create_session, clear_mappers


import datetime as dt
# def conTime(timestamp):
#       return int(timestamp.strftime("%s"))*1000


class Cyclelogx(object):
	pass

class Aliverowx(object):
		pass
				


@app.route('/fractal/mcmsgsnew', methods=['POST'])
def mcmsgsnew():
	j = request.json
	if j['type']=='currentshift':
		for rr in j['msg']:
			print rr['mcid']
			if rr['mcid']==1:
				ts=rr['timestamp']
				entt=machinecurrentshift1.Machinecurrentshift1.query.get(1)
				entt.value=json.dumps(rr['data'])
				entt.timestamp = datetime.datetime.utcfromtimestamp(ts/1000.)
#				print 'machine 1 timestamp'
#				print timestamp
				db.session.merge(entt)
				db.session.commit()
			if rr['mcid']==2:
				ts=rr['timestamp']
				entt=machinecurrentshift2.Machinecurrentshift2.query.get(1)
				entt.value=json.dumps(rr['data'])
				entt.timestamp = datetime.datetime.utcfromtimestamp(ts/1000.)
#				print 'machine 2 timestamp'
#				print timestamp
				db.session.merge(entt)
				db.session.commit()

	if j['type']=='prevshift':
		for rr in j['msg']:
			if rr['mcid']==1:
				entt=machineshifthistory1.Machineshifthistory1(
										value=json.dumps(rr['data']), 
										date=datetime.datetime.utcfromtimestamp(rr['date']/1000), 
										shifttimeid=rr['shifttimeid'])
				db.session.add(entt)
				db.session.commit()
			if rr['mcid']==2:
				entt=machineshifthistory2.Machineshifthistory2(
										value=json.dumps(rr['data']), 
										date=datetime.datetime.utcfromtimestamp(rr['date']/1000), 
										shifttimeid=rr['shifttimeid'])
				db.session.add(entt)
				db.session.commit()

	return jsonify({'result': 'success'}), 201

