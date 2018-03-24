from app import app, db
from flask import request, jsonify, Response, render_template, g
import json
from app.functionss import access
from app.models import alarmlog, cyclelog, productionlog, aliverow
import datetime

@app.route('/')
@access.log_required1
def indexpage():
	username = g.user.username if not g.user.is_anonymous else None
	return render_template('index.html', username=username)

@app.route('/login')
def login():
	return app.send_static_file('login.html')
