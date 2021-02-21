from flask import Flask, request, make_response, send_from_directory, jsonify
import os
from datetime import datetime
import werkzeug
import io
import firebase_admin
from firebase_admin import credentials, storage
from back_end.server.database import init_db
import back_end.server.models
from flask_sqlalchemy import SQLAlchemy
from back_end.server.models.model import ImageStore
import json
from PIL import Image


UPLOAD_DIR = os.getenv('UPLOAD_DIR_PATH') # back_end/uploads/
# firebase認証
cred = credentials.Certificate(json.loads(os.environ['SERVICE_ACCOUNT_KEY']))
# cred = credentials.Certificate('./serviceAccountKey.json')
firebase_admin.initialize_app(cred, {'storageBucket': 'image-uploader-6cb38.appspot.com'})


def create_app():
    app = Flask(__name__, static_url_path='', static_folder='./build')

    # データサイズの上限:1MB
    app.config['MAX_CONTENT_LENGTH'] = 1 * 1024 * 1024

    # DB接続設定
    app.config.from_object('back_end.server.config.Config')
    init_db(app)

    return app


app = create_app()
db = SQLAlchemy(app)


@app.route('/', defaults={'path':''})
def index(path):
    return send_from_directory(app.static_folder,'index.html')


@app.route('/upload_image', methods=['POST'])
def upload_image():
    if 'file' in request.files:
        return make_response(jsonify({'result':'file is empty.'}))
    file = request.files['image']
    saveFileName = datetime.now().strftime('%Y%m%d_%H%M%S_') + werkzeug.utils.secure_filename(file.filename)

    imageUrl = store_firebase(file, saveFileName)
    store_mysql(saveFileName, imageUrl)

    return imageUrl


@app.errorhandler(werkzeug.exceptions.RequestEntityTooLarge)
def handle_over_max_file_size(error):
    return make_response(jsonify({'result':'file size is overed.'}))


def store_firebase(file, saveFileName):
    bucket = storage.bucket()
    blob = bucket.blob(saveFileName)
    image_format = saveFileName.split('.')[1]
    if image_format == 'png':
        content_type = 'image/png'
    else:
        content_type = 'image/jpg'
    blob = bucket.blob(saveFileName)

    # bytes形式で読み込み
    img = Image.open(file)
    # メモリでデータを保持する
    bio = io.BytesIO()
    img.save(bio, format=image_format)

    blob.upload_from_string(data=bio.getvalue(), content_type=content_type)
    blob.make_public()
    return blob.public_url


def store_mysql(saveFileName, imageUrl):
    image = ImageStore(saveFileName, imageUrl)
    db.session.add(image)
    db.session.commit()


if __name__ == '__main__':
    app.run()
