# from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, Integer, String
from back_end.server.database import db

# Base = declarative_base()

class ImageStore(db.Model):
  __tablename__ = 'images'

  id = Column(Integer, primary_key=True)
  image_name = Column(String(80), unique=True)
  url = Column(String(120), unique=True)

  def __init__(self, image_name, url):
        self.image_name = image_name
        self.url = url
