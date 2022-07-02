import os
from werkzeug.security import generate_password_hash, check_password_hash
from flask import Flask, render_template, request, jsonify
from flask_script import Manager
from flask_migrate import Migrate, MigrateCommand
from flask_cors import CORS
from flask_jwt_extended import JWTManager, create_access_token, get_jwt_identity, jwt_required
from models import db, User
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
app.url_map.strict_slashes = False
app.config['DEBUG'] = os.getenv('DEBUG')
app.config['ENV'] = os.getenv('ENV')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///site.db' # 'sqlite:////D:/ProyectosArian/login_con_jwt/backend/env/code.db'
app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY') #'1061bb40ea99675d095192c6ea8f9f54' # arian

db.init_app(app)
jwt = JWTManager(app)
Migrate(app, db)
CORS(app)
manager = Manager(app)
manager.add_command('db', MigrateCommand) # init migrate upgrade


@app.route("/")
def main():
    return render_template('index.html')


""" -------------------Ruta Registro-------------------- """

@app.route("/api/register", methods=['POST'])
def register():
    username = request.json.get('username')
    password = request.json.get('password')

    if not username: return jsonify({"msg": "El nombre de usuario es requerido"}), 400
    if not password: return jsonify({"msg": "La contraseña es requerida"}), 400

    user = User.query.filter_by(username=username).first()
    if user: return jsonify({"msg": "El usuario ya existe!!!"}),400

    user= User()
    user.username = username
    user.password = generate_password_hash(password)
    user.save()

    if not user: return jsonify({"msg": "El registro falló!!!"}),400

    access_token = create_access_token(identity= user.idusuario)
    
    data = {
        "access_token": access_token,
        "user": user.serialize()
    }

    return jsonify(data), 200

"""
{
    "username": "",
    "password": ""
}

"""


""" -------------------Ruta Login-------------------- """

@app.route("/api/login", methods=['POST'])
def login():
    username = request.json.get('username')
    password = request.json.get('password')

    if not username: return jsonify({"msg": "El nombre de usuario es requerido"}), 400
    if not password: return jsonify({"msg": "La contraseña es requerida"}), 400

    user = User.query.filter_by(username=username).first()
    if not user: return jsonify({"msg": "El nombre de usuario o la contraseña es incorrecta!!!"}),400

    if not check_password_hash(user.password, password): 
        return jsonify({"msg": "El nombre de usuario o la contraseña es incorrecta!!!"}),401

    access_token = create_access_token(identity= user.idusuario)
     
    data = {
        "access_token": access_token,
        "user": user.serialize()
    }

    return jsonify(data), 200


""" -------------------Ruta Profile-------------------- """

""" @app.route("/api/profile", methods=['GET'])
@jwt_required()
def profile():
    idusuario = get_jwt_identity()
    user = User.query.get(idusuario)
    return jsonify(user.serialize()),200 """


@app.route("/api/profile", methods=['GET'])
@jwt_required()
def profile():
    identity = get_jwt_identity()
    user = User.query.filter_by(idusuario=identity).first()
    return jsonify( user.serialize()),200
    #return jsonify({"identity":identity, "user": user.serialize()}),200
    #return jsonify({"success":" Username" + username + "is online"}),200

if __name__ == '__main__':
    manager.run()
