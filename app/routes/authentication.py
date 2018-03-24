from app import app, db, lm, bcrypt
from app.models.user import User
from flask import abort, jsonify, request, session, g, redirect, url_for
import datetime
import json
from app.functionss import access
from flask.ext.login import login_user, logout_user, current_user

@lm.user_loader
def user_loader(userid):
    return User.query.get(int(userid))

@app.before_request
def before_request():
    g.user = current_user
    # print g.user.get_id()
    # return jsonify({'data' : g.user.username})
    # return jsonify({'data' : user})


@app.route('/noviga/loginpage', methods=['POST'])
def loginForm():
    json_data = request.json
    user = User.query.filter_by(username=json_data['username']).first()
    if user and bcrypt.check_password_hash(user.password, json_data['password']):
        login_user(user)
        status = True
        return jsonify({'result': True}), 200
    else:
        status = False
        raise BadRequestError('Invalid username or password')


@app.route('/noviga/logout')
@access.log_required1
def logout():
    logout_user()
    return redirect(url_for('login'))

@app.route('/noviga/getUser')
def getUser():
    loggedInUser = None
    if not g.user.is_anonymous:
        loggedInUser = User.query.filter_by(username=g.user.username).first()
        loggedInUser.password = None
        return jsonify(loggedInUser.to_dict())
    else:
        return json.dumps(loggedInUser)

@app.route('/noviga/getStatus')
def getStatus():
    status = False
    if not g.user.is_anonymous:
        status = True
    return jsonify({'status' : status})

