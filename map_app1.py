from flask import Flask, render_template, jsonify, request
from flask_sqlalchemy import SQLAlchemy

# Flask 앱 생성
map_app = Flask(__name__)

# SQLAlchemy 데이터베이스 설정
map_app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:1234@localhost/sejong_protected_zone'
map_app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(map_app)

# 사용자 모델 정의
class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(80), unique=True, nullable=False)
    password = db.Column(db.String(120), nullable=False)

# 기본 경로 설정 ("/")
@map_app.route('/')
def home():
    return render_template('index.html')  # test.html 렌더링

# 로그인 페이지
@map_app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        email = request.form['email']
        password = request.form['password']

        # SQLAlchemy를 사용해 사용자 인증
        user = User.query.filter_by(email=email, password=password).first()
        if user:
            return '로그인 성공!'
        else:
            return '로그인 실패: 이메일 또는 비밀번호를 확인하세요.'
    return render_template('login.html')

# 회원가입 페이지
@map_app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        email = request.form['email']
        password = request.form['password']

        # SQLAlchemy를 사용해 사용자 추가
        new_user = User(email=email, password=password)
        try:
            db.session.add(new_user)
            db.session.commit()
            return '회원가입 성공!'
        except Exception as e:
            db.session.rollback()
            return f'회원가입 실패: {e}'
    return render_template('register.html')

# 'Contact' 페이지 렌더링
@map_app.route('/position')
def contact():
    return render_template('position.html')

@map_app.route('/roadview_search')
def roadview_search():
    return render_template('roadview_search.html')  # 로드뷰 페이지

# 'roadview_search' 페이지 렌더링
@map_app.route('/page')
def page():
    return render_template('page.html')  # 로드뷰 페이지

# 검색 페이지 렌더링
@map_app.route('/search')
def search():
    return render_template('search.html')  # 검색 

# 검색 페이지 렌더링
@map_app.route('/반경')
def 반경():
    return render_template('반경.html')

if __name__ == '__main__':
    with map_app.app_context():
        db.create_all()  # 데이터베이스 테이블 생성
    # 5507번 포트에서 서버 실행
    map_app.run(host='0.0.0.0', port=5507, debug=True)
