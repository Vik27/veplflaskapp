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
#       return int(timestamp.strftime("%s"))*1000


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

