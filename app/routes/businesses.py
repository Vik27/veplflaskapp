from app import app, db
from app.models import business
from app.models import user, component, project, legend
from flask import abort, jsonify, request
import datetime
import json
from app.functionss import access
from sqlalchemy import func

@app.route('/noviga/businesses', methods = ['GET'])
@access.log_required1
@access.requires_roles('Admin')
def get_all_businesses():
    entities = business.Business.query.all()
    binesses = len(entities)*[None]
    for i in range(len(entities)):
        binesses[i] = entities[i].to_dict()
        binesses[i]["currentUsrUsers"] = db.session.query(func.count(user.User.id)).filter\
            ((user.User.businessId==binesses[i]["id"]) &(user.User.role=='User')).scalar()
        binesses[i]["currentMgrUsers"] = db.session.query(func.count(user.User.id)).filter\
            ((user.User.businessId==binesses[i]["id"]) &(user.User.role=='Manager')).scalar()
        binesses[i]["currentComponents"] = db.session.query(func.count(component.Component.id)).filter\
            (component.Component.businessId==binesses[i]["id"]).scalar()
        binesses[i]["currentRunProjects"] = db.session.query(func.count(project.Project.id)).filter\
            ((project.Project.businessId==binesses[i]["id"]) & (project.Project.status=='running')).scalar()
        binesses[i]["currentLegends"] = db.session.query(func.count(legend.Legend.id)).filter\
        (legend.Legend.businessId == binesses[i]["id"]).scalar()
    return json.dumps(binesses)

@app.route('/noviga/businesses/<int:id>', methods = ['GET'])
@access.log_required1
@access.business_check
def get_business(id):
    entity = business.Business.query.get(id)
    if not entity:
        abort(404)
    return jsonify(entity.to_dict())

@app.route('/noviga/businesses', methods = ['POST'])
@access.log_required1
@access.requires_roles('Admin')
def create_business():
    entity = business.Business(
        name = request.json['name']
        , allowedRunProjects = request.json['allowedRunProjects']
        , allowedUsrUsers = request.json['allowedUsrUsers']
        , allowedMgrUsers = request.json['allowedMgrUsers']
        , allowedComps = request.json['allowedComps']
        , allowedLegends = request.json['allowedLegends']
    )
    db.session.add(entity)
    db.session.commit()
    biness = entity.to_dict()
    biness['currentUsrUsers'] = 0
    biness['currentMgrUsers'] = 0
    biness['currentRunProjects'] = 0
    biness['currentComponents'] = 0
    biness['currentLegends'] = 0
    return jsonify(biness), 201

@app.route('/noviga/businesses/<int:id>', methods = ['PUT'])
@access.log_required1
@access.requires_roles('Admin')
def update_business(id):
    entity = business.Business.query.get(id)
    if not entity:
        abort(404)
    entity = business.Business(
        name = request.json['name']
        , allowedRunProjects = request.json['allowedRunProjects']
        , allowedMgrUsers = request.json['allowedMgrUsers']
        , allowedUsrUsers = request.json['allowedUsrUsers']
        , allowedComps = request.json['allowedComps']
        , id = id
    )
    db.session.merge(entity)
    db.session.commit()
    biness = entity.to_dict()
    biness['currentUsrUsers'] = db.session.query(func.count(user.User.id)).filter\
            ((user.User.businessId==biness["id"]) &(user.User.role=='User')).scalar()
    biness['currentMgrUsers'] = db.session.query(func.count(user.User.id)).filter\
            ((user.User.businessId==biness["id"]) &(user.User.role=='Manager')).scalar()
    biness['currentComponents'] = db.session.query(func.count(component.Component.id)).filter\
            (component.Component.businessId==biness["id"]).scalar()
    biness['currentRunProjects'] = db.session.query(func.count(project.Project.id)).filter\
            ((project.Project.businessId==biness["id"]) & (project.Project.status=='running')).scalar()
    binesses[i]["currentLegends"] = db.session.query(func.count(legend.Legend.id)).filter\
        (legend.Legend.businessId == biness["id"])
    return jsonify(biness), 200

@app.route('/noviga/businesses/<int:id>', methods = ['DELETE'])
@access.log_required1
@access.requires_roles('Admin')
def delete_business(id):
    entity = business.Business.query.get(id)
    if not entity:
        abort(404)
    db.session.delete(entity)
    db.session.commit()
    return '', 204
