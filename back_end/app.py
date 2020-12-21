from flask import Flask

app = Flask(__name__)


@app.route('/send_image')
def hello():
    name = 'Hello'
    return name


if __name__ == "__main__":
    app.run(debug=True)
