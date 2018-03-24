from app import app, db, bcrypt
from flask import abort, jsonify, request, send_file, g, session
import datetime
import json
from app.functionss import access
from app.models import productionlog, cyclelog, alarmlog, downtimereason, dtlog, currentdata, patrollog, patrolchksheet, fpalog, fpachksheet
from sqlalchemy import func

@app.route('/dtlogroute', methods = ['POST'])
def downtimelog():
	# enter downtime message in dtlog table
	j = request.json
	if 'cancelFlag' in j:
		dtlogEnt = dtlog.Dtlog.query.get(j['idToChange'])
		dtlogEnt.dtreason = j['reason']
		dtlogEnt.timestamp = datetime.datetime.now()
		db.session.merge(dtlogEnt)
	else:
		dtlogEnt = dtlog.Dtlog(timestamp = datetime.datetime.now(), dtreason = j['reason'])
		db.session.add(dtlogEnt)

	db.session.commit()

	return jsonify({'result': 'success', 'id': dtlogEnt.id}), 201

@app.route('/fpalogroute', methods=['POST'])
def fpalogfunc():
	j=request.json
	fpachkEnt=fpachksheet.Fpachksheet(checksheetitems=j['checksheetitems'], weight=j['weight'])
	db.session.add(fpachkEnt)
	db.session.commit()


	fpalogEnt=fpalog.Fpalog(fpachksheetid=fpachkEnt.id, timestamp=datetime.datetime.now(), userid=j['user'])
	db.session.add(fpalogEnt)
	db.session.commit()

	return jsonify({'result':'success'}), 201

@app.route('/patrollogroute', methods=['POST'])
def patrollogfunc():
	j=request.json
	patrolchkEnt=patrolchksheet.Patrolchksheet(weight=j['weight'], color=j['color'], batchno=j['batchNo'])
	db.session.add(patrolchkEnt)
	db.session.commit()

	patrollogEnt=patrollog.Patrollog(patrolchksheetid=patrolchkEnt.id, timestamp=datetime.datetime.now(), userid=j['user'])
	db.session.add(patrollogEnt)
	db.session.commit()
	return jsonify({'result':'success'}), 201

@app.route('/partstatus/<int:id>', methods = ['POST'])
def partstatuslog(id):
	# enter partstatus in the cyclelog table corresponding to the id (newId)
	cycEnt = cyclelog.Cyclelog.query.get(id)
	if cycEnt and not cycEnt.partStatus:
		cycEnt.partStatus = request.json['reason']
		db.session.merge(cycEnt)
		result = 'success'
	else:
		result = 'failure'

	if not request.json['reason'] == 1:
		# add ng count
		cdrow = currentdata.Currentdata.query.get(1)
		cdrow.currentMouldNotOKCount += 1
		cdrow.currentShiftNotOKCount += 1
		db.session.merge(cdrow)
	else:
		# add ok count
		cdrow = currentdata.Currentdata.query.get(1)
		cdrow.currentMouldOKCount += 1
		cdrow.currentShiftOKCount += 1
		db.session.merge(cdrow)

	db.session.commit()

	return jsonify({'result': result,
		'currentMouldOKCount': cdrow.currentMouldOKCount,
		'currentMouldNotOKCount': cdrow.currentMouldNotOKCount,
		}), 201


