from flask import Flask, request, make_response, send_from_directory, jsonify
import os
from datetime import datetime
import werkzeug
import io
import firebase_admin
from firebase_admin import credentials, storage
from server.database import init_db
import server.models
from flask_sqlalchemy import SQLAlchemy
from server.models.model import Image


UPLOAD_DIR = os.getenv('UPLOAD_DIR_PATH') # uploads/
# firebase認証
cred = credentials.Certificate('./serviceAccountKey.json')
firebase_admin.initialize_app(cred, {'storageBucket': 'image-uploader-6cb38.appspot.com'})


def create_app():
    app = Flask(__name__)

    # データサイズの上限:1MB
    app.config['MAX_CONTENT_LENGTH'] = 1 * 1024 * 1024

    # DB接続設定
    app.config.from_object('server.config.Config')
    init_db(app)

    return app


app = create_app()
db = SQLAlchemy(app)


@app.route('/upload_image', methods=['POST'])
def upload_image():
    if 'file' in request.files:
        return make_response(jsonify({'result':'file is empty.'}))
    file = request.files['image']
    print(file)
    saveFileName = datetime.now().strftime('%Y%m%d_%H%M%S_') + werkzeug.utils.secure_filename(file.filename)
    file.save(os.path.join(UPLOAD_DIR, saveFileName))

    imageUrl = store_firebase(saveFileName)
    store_mysql(saveFileName, imageUrl)

    return imageUrl


@app.errorhandler(werkzeug.exceptions.RequestEntityTooLarge)
def handle_over_max_file_size(error):
    return make_response(jsonify({'result':'file size is overed.'}))


def store_firebase(saveFileName):
    bucket = storage.bucket()
    blob = bucket.blob(saveFileName)
    if saveFileName.split('.')[1] == 'png':
        content_type = 'image/png'
    else:
        content_type = 'image/jpg'
    blob = bucket.blob(saveFileName)
    with open(UPLOAD_DIR + '/' + saveFileName, 'rb') as f:
        blob.upload_from_file(f, content_type=content_type)
    blob.make_public()
    return blob.public_url


def store_mysql(saveFileName, imageUrl):
    image = Image(saveFileName, imageUrl)
    db.session.add(image)
    db.session.commit()
