from app import app, db, mail, bcrypt
from flask import abort, jsonify, request, send_file, g, session
import datetime
import json
from app.functionss import access
from flask_mail import Message
import sys, os, re
from stat import S_ISREG, ST_CTIME, ST_MODE
import time
import smtplib
# from app.models import cyclelog, aliverow, cyclelognew, cyclelognew2
from sqlalchemy import func
# from email.mime.text import MIMEText

from threading import Thread
import pprint
