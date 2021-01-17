from flask import Flask, request, make_response, send_from_directory
import os
from datetime import datetime
import werkzeug
import firebase_admin
from firebase_admin import credentials, storage
import io


app = Flask(__name__)

# データサイズの上限:1MB
app.config['MAX_CONTENT_LENGTH'] = 1 * 1024 * 1024
UPLOAD_DIR = os.getenv('UPLOAD_DIR_PATH') # ./uploads

# firebase認証
cred = credentials.Certificate('./serviceAccountKey.json')
firebase_admin.initialize_app(cred, {'storageBucket': 'image-uploader-6cb38.appspot.com'})


@app.route('/upload_image', methods=['POST'])
def upload_image():
    if 'file' in request.files:
        return make_response(jsonify({'result':'file is empty.'}))
    file = request.files['image']
    saveFileName = datetime.now().strftime('%Y%m%d_%H%M%S_') + werkzeug.utils.secure_filename(file.filename)
    file.save(os.path.join(UPLOAD_DIR, saveFileName))

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


@app.errorhandler(werkzeug.exceptions.RequestEntityTooLarge)
def handle_over_max_file_size(error):
    return make_response(jsonify({'result':'file size is overed.'}))


@app.route('/uploads/<filename>', methods=['GET'])
def show_uploaded_file(filename):
    print(os.getenv('UPLOAD_DIR_PATH'))
    return send_from_directory(os.getenv('UPLOAD_DIR_PATH'), filename)


if __name__ == "__main__":
    app.run(debug=True)
