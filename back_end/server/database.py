from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
import os

db = SQLAlchemy()
MIGRATION_DIR = os.path.join('back_end/server/models', 'migrations')

def init_db(app):
  db.init_app(app)
  Migrate(app, db, directory=MIGRATION_DIR)
