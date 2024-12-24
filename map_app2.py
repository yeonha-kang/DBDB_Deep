from flask import Flask
from subprocess import Popen

app = Flask(__name__)

@app.route('/')
def home():
    return "Jupyter Notebook 연결 성공!"

@app.route('/start_jupyter')
def start_jupyter():
    # Jupyter Notebook 서버를 백그라운드에서 실행
    Popen(['jupyter', 'notebook', '--no-browser', '--port=8888'])
    return "Jupyter Notebook 서버가 시작되었습니다."

if __name__ == '__main__':
    app.run(debug=True)
