from app import app, db, bcrypt
from app.models import user
from app.models import business
from flask import abort, jsonify, request
import datetime
import json
from app.functionss import access
from flask.ext.login import login_user, logout_user, current_user

class BadRequestError(ValueError):
    pass


def bad_request(message):
    response = jsonify({'message': message})
    response.status_code = 400
    return response


@app.errorhandler(BadRequestError)
def bad_request_handler(error):
    return bad_request(error.message)


@app.route('/noviga/businesses/all/userdata', methods = ['GET'])
@access.log_required1
@access.requires_roles('Admin')
def get_usersdata():
    user_entities = user.User.query.all()
    users = len(user_entities)*[None]
    for i in range(len(user_entities)):
        users[i] = user_entities[i].to_dict()
    bus_entities = business.Business.query.all()
    businesses = len(bus_entities)*[None]
    for i in range(len(bus_entities)):
        businesses[i] = bus_entities[i].to_dict()
    usersdata = {'users': users, 'businesses': businesses}
    return jsonify(usersdata)


@app.route('/noviga/businesses/<int:businessId>/userdata', methods = ['GET'])
@access.log_required1
@access.business_check
@access.requires_roles('Manager')
def get_biness_usersdata(businessId):
    biness = business.Business.query.get(businessId)
    user_entities = user.User.query.filter(user.User.businessId==businessId).all()
    users = len(user_entities)*[None]
    for i in range(len(user_entities)):
        users[i] = user_entities[i].to_dict()
    usersdata = {'users': users, 'businesses': biness.to_dict()}
    return jsonify(usersdata)


@app.route('/noviga/users', methods = ['POST'])
@access.log_required1
@access.requires_roles('Admin')
def create_user():
    entity = user.User(
        username = request.json['username']
        , password = request.json['password']
        , contact_email = request.json['contact_email']
        , role = request.json['role']
    )
    if not request.json['role']=='Admin':
        if (request.json['businessId']):
            biness = business.Business.query.get(request.json['businessId'])
            if not biness:
                abort(404)
            if request.json['role']=='Manager':
                binessMgrUsers = user.User.query.filter\
                ((user.User.businessId==request.json['businessId']) & (user.User.role=='Manager')).all()
                if (len(binessMgrUsers) < biness.allowedMgrUsers):
                    biness.users.append(entity)
                    db.session.add(biness)
                    db.session.commit()
                else:
                    raise BadRequestError('Allowed Manager accounts limit reached.')
            else:
                binessUsrUsers = user.User.query.filter\
                ((user.User.businessId==request.json['businessId']) & (user.User.role=='User')).all()
                if (len(binessUsrUsers) < biness.allowedUsrUsers):
                    biness.users.append(entity)
                    db.session.add(biness)
                    db.session.commit()
                else:
                    raise BadRequestError('Allowed User accounts limit reached.')
        else:
            db.session.add(entity)
            db.session.commit()
    else:
        db.session.add(entity)
        db.session.commit()
    return jsonify(entity.to_dict()), 201


@app.route('/noviga/users/<int:id>', methods = ['PUT'])
@access.log_required1
@access.requires_roles('Admin')
def update_user(id):
    entity = user.User.query.get(id)
    if not entity:
        abort(404)
    entity.username = request.json['username']
    entity.password = bcrypt.generate_password_hash(request.json['password'])
    entity.contact_email = request.json['contact_email']
    entity.role = request.json['role']
    if not request.json['role']=='Admin':
        if (request.json['businessId']):
            biness = business.Business.query.get(request.json['businessId'])
            if not biness:
                abort(404)
            if request.json['role']=='Manager':
                binessMgrUsers = user.User.query.filter\
                ((user.User.businessId==request.json['businessId']) & (user.User.role=='Manager')).all()
                print binessMgrUsers
                if (len(binessMgrUsers) <= biness.allowedMgrUsers):
                    biness.users.append(entity)
                    db.session.add(biness)
                    db.session.commit()
                else:
                    raise BadRequestError('Allowed Manager accounts limit reached.')
            else:
                binessUsrUsers = user.User.query.filter\
                ((user.User.businessId==request.json['businessId']) & (user.User.role=='User')).all()
                if (len(binessUsrUsers) <= biness.allowedUsrUsers):
                    biness.users.append(entity)
                    db.session.add(biness)
                    db.session.commit()
                else:
                    raise BadRequestError('Allowed User accounts limit reached.')
        else:
            entity.role = request.json['role']
            db.session.commit()
    else:
        entity.role = 'Admin'
        entity.businessId = request.json['businessId']
        db.session.commit()
    return jsonify(entity.to_dict()), 200


@app.route('/noviga/users/<int:id>', methods = ['DELETE'])
@access.log_required1
@access.requires_roles('Admin')
def delete_user(id):
    entity = user.User.query.get(id)
    if not entity:
        abort(404)
    db.session.delete(entity)
    db.session.commit()
    return '', 204


@app.route('/noviga/businesses/<int:businessId>/users', methods = ['POST'])
@access.log_required1
@access.business_check
@access.requires_roles('Admin','Manager')
def create_biness_user(businessId):
    biness = business.Business.query.get(businessId)
    if not biness:
        abort(404)
    entity = user.User(
        username = request.json['username']
        , password = request.json['password']
        , contact_email = request.json['contact_email']
        , role = request.json['role']
    )
    if not request.json['role']=='Admin':
        if request.json['role']=='Manager':
            binessMgrUsers = user.User.query.filter\
            ((user.User.businessId==businessId) & (user.User.role=='Manager')).all()
            if (len(binessMgrUsers) < biness.allowedMgrUsers):
                biness.users.append(entity)
                db.session.add(biness)
                db.session.commit()
            else:
                raise BadRequestError('Allowed Manager accounts limit reached.')
        else:
            binessUsrUsers = user.User.query.filter\
            ((user.User.businessId==businessId) & (user.User.role=='User')).all()
            if (len(binessUsrUsers) < biness.allowedUsrUsers):
                biness.users.append(entity)
                db.session.add(biness)
                db.session.commit()
            else:
                raise BadRequestError('Allowed User accounts limit reached.')
    else:
        abort(404)
    return jsonify(entity.to_dict()), 201


@app.route('/noviga/businesses/<int:businessId>/users/<int:id>', methods = ['PUT'])
@access.log_required1
@access.business_check
@access.requires_roles('Admin','Manager')
def update_biness_user(businessId,id):
    entity = user.User.query.filter((user.User.businessId==businessId) & (user.User.id==id)).first()
    if not entity:
        abort(404)
    biness = business.Business.query.get(businessId)
    if not biness:
        abort(404)
    entity.username = request.json['username']
    entity.password = bcrypt.generate_password_hash(request.json['password'])
    entity.contact_email = request.json['contact_email']
    entity.role = request.json['role']

    if not request.json['role']=='Admin':
        if request.json['role']=='Manager':
            binessMgrUsers = user.User.query.filter\
            ((user.User.businessId==businessId) & (user.User.role=='Manager')).all()
            if (len(binessMgrUsers) <= biness.allowedMgrUsers):
                db.session.commit()
            else:
                raise BadRequestError('Allowed Manager accounts limit reached.')
        else:
            binessUsrUsers = user.User.query.filter\
            ((user.User.businessId==businessId) & (user.User.role=='User')).all()
            if (len(binessUsrUsers) <= biness.allowedUsrUsers):
                db.session.commit()
            else:
                raise BadRequestError('Allowed User accounts limit reached.')
    else:
        abort(404)
    return jsonify(entity.to_dict()), 200


@app.route('/noviga/businesses/<int:businessId>/users/<int:id>', methods = ['DELETE'])
@access.log_required1
@access.business_check
@access.requires_roles('Admin','Manager')
def delete_biness_user(businessId,id):
    entity = user.User.query.filter((user.User.businessId==businessId) & (user.User.id==id)).one()
    if not entity:
        abort(404)
    db.session.delete(entity)
    db.session.commit()
    return '', 204
