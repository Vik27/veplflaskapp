from app import app, db
from app.models import business, user
from flask import abort, jsonify, request
import datetime
import json
from app.functionss import access

@app.route('/create-admin-entries', methods = ['GET'])
@access.log_required1
@access.requires_roles('Admin')
def create_admin_entries():
	b1 = business.Business(
		name = 'VEPL-III'
	)
	db.session.add(b1)
	db.session.commit()

	
	u1 = user.User(
		username = 'pbpp3',
		password = 'pp3bp',
		contact_email = 'bohra.paresh@varrocgroup.com',
		role = 'production',
		responsibility = 'Both',
		phoneNo = 00000000000,
		businessId = 1
	)
	u2 = user.User(
		username = 'smpp3',
		password = 'pp3ms',
		contact_email = 'mishra.saumyajyoti@varrocgroup.com',
		role = 'me',
		responsibility = 'Electrical',
		phoneNo = 9673001769,
		businessId = 1
	)
	
	db.session.add(u1)
	db.session.add(u2)
	db.session.commit()

	
	return jsonify({'result': 'success'})





