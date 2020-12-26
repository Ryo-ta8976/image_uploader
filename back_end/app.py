from flask import Flask, request

app = Flask(__name__)


@app.route('/send_image', methods=['POST'])
def send_image():
    print(request.files.get('file'))
    # res = request.files.get('file')
    res = "hello"
    return res


if __name__ == "__main__":
    app.run(debug=True)
