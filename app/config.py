# app/config.py

import os
basedir = os.path.abspath(os.path.dirname(__file__))


class BaseConfig(object):
    SECRET_KEY = 'my_precious'
    DEBUG = True
    BCRYPT_LOG_ROUNDS = 12
    SQLALCHEMY_DATABASE_URI = 'mysql://root:qwe123@localhost:3306/fractaliot'
    SQLALCHEMY_TRACK_MODIFICATIONS = True
    #EMAIL SETTINGS
    MAIL_SERVER = 'smtp.zoho.com'
    MAIL_PORT = 465
    MAIL_USE_TLS = False
    MAIL_USE_SSL = True
    MAIL_USERNAME = 'vikrant@novigo.tech'#os.environ.get('MAIL_USERNAME')
    MAIL_PASSWORD = 'Frodo491!'#os.environ.get('MAIL_PASSWORD')
    

