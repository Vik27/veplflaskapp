activate_this = '/home/ubuntu/venvs/python2714/bin/activate_this.py'
execfile(activate_this, dict(__file__=activate_this))
import sys
sys.path.insert(0, '/var/www/html/fractal')

from app import app as application




