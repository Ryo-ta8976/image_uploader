import os

class DevelopmentConfig:

    DEBUG = True

    # try:
    #     from .local_config import *
    # except ImportError:
    #     pass

    # if not DEBUG:

    SQLALCHEMY_DATABASE_URI = 'mysql+pymysql://{user}:{password}@{host}/{db_name}?charset=utf8'.format(**{
        'db_name': os.getenv('DB_NAME', os.environ['DB_NAME']),
        'user': os.getenv('DB_USER', os.environ['DB_USERNAME']),
        'password': os.getenv('DB_PASSWORD', os.environ['DB_PASSWORD']),
        'host': os.getenv('DB_HOST', os.environ['DB_HOSTNAME']),
    })
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SQLALCHEMY_ECHO = False


Config = DevelopmentConfig
