from app import app, db
from flask import request, jsonify, Response, render_template, g
import json
from app.functionss import access
from app.models import cyclelog, aliverow
import datetime

@app.route('/boschmsgs', methods = ['POST'])
def ichenmsgs():

	dd=datetime.datetime.now()
	# print 'ichenmsgs'

	j = request.json
		msg={'modelNo':sett[0], 'timeStamp':sett[0].strftime('%Y-%b-%d %H:%M:%S'), 'okCount':okCount[0]-noOfRows-1, 'tpCount':tpCount[0],'type':'CycleData'}

	if j['type'] == 'CycleData':
		
		cyclogEnt = cyclelog.Cyclelog(
			timestamp = datetime.datetime(j['timeStamp']),
			modelNo = j['modelNo'],
			okCount = j['okCount'],
			tpCount = j['tpCount'],
			
			)
		db.session.add(cyclogEnt)
		db.session.commit()


	if j['type']=='Alive':
		row1 = aliverow.Aliverow.query.get(1)
		row1.timestamp = dd
		db.session.merge(row1)
		db.session.commit()
		idtoret = 1

	# db.session.commit()

	return jsonify({'result': 'success', 'type': j['type']})

