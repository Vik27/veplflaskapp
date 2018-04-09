from app import app, db
from flask import request, jsonify, Response, render_template, g
import json
from app.functionss import access
from app.models import cyclelog, aliverow
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



