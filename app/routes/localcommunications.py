from app import app, db
from flask import request, jsonify, Response, render_template, g
import json
from app.functionss import access
from app.models import machinecurrentshift2 #, aliverow, cyclelognew, cyclelognew2, aliverow2
import datetime



from sqlalchemy import Table, Column, Integer, Float, DateTime ,String, Unicode, MetaData, create_engine
from sqlalchemy.orm import mapper, create_session, clear_mappers


import datetime as dt
# def conTime(timestamp):
# 	return int(timestamp.strftime("%s"))*1000


class Cyclelogx(object):
    pass

class Aliverowx(object):
 	pass
 		


@app.route('/fractal/mcmsgsnew', methods=['POST'])
def mcmsgsnew():

	j = request.json
	if j['mcid']==2:
		entt=machinecurrentshift2.Machinecurrentshift2.query.get(1)
		entt.value=j['data']
		db.session.merge(entt)
		db.session.commit()

	return jsonify({'result': 'success'}), 201


@app.route('/fractal/mcmsgsnew2', methods=['POST'])
def mcmsgsnew2():

        j = request.json

        if j['type'] == 'CycleData':
                newcyc = cyclelognew2.Cyclelognew2(timestamp = datetime.datetime.now(), count = j['count'], faultCode = j['faultCode'])
                db.session.add(newcyc)
                db.session.commit()

        if j['type'] == 'Alive':
#               newalive = aliverow.Aliverow(timestamp = datetime.datetime.now())
                newalive = aliverow2.Aliverow2.query.get(1)
                newalive.timestamp = datetime.datetime.now()
                db.session.add(newalive)
                db.session.commit()

        return jsonify({'result': 'success'}), 201


@app.route('/fractal/mcmsgs', methods = ['POST'])
def ichenmsgs():
	j = request.json

	if j['type'] == 'CycleData':

		e = create_engine('mysql://root:qwe123@localhost:3306/fractaliot')
		metadata = MetaData(bind=e)
		mcid=j['machineNo']

		tn='cyclelog'+str(mcid)
		t = Table(tn, metadata, Column('id', Integer, primary_key=True),
			    Column('timestamp', DateTime), Column('modelNo', String(256)), Column('okcount', Integer),
			    Column('totalproduction', Integer), Column('rejectionreasons', String(256)))
		mapper(Cyclelogx, t)

		sess = create_session(bind=e, autocommit=False, autoflush=True)

		w = Cyclelogx()

		w.timestamp = datetime.datetime.strptime(j['timeStamp'], '%Y-%b-%d %H:%M:%S')
		w.modelNo = j['modelNo']
		w.okcount = j['okCount']
		w.totalproduction = j['tpCount']
		w.rejectionreasons = j['rejectionreasons']

		sess.add(w)
		sess.commit()
		sess.close()
		clear_mappers()




	return jsonify({'result': 'success', 'type': j['type']})



