from flask_sqlalchemy import SQLAlchemy
db = SQLAlchemy()

class User(db.Model):
    __tablename__ = 'usuario'
    idusuario = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(100), nullable=False, unique=True)
    password = db.Column(db.String(100), nullable=False)

    def serialize(self):
        return {
            "idusuario": self.idusuario,
            "username": self.username
        }

    def save(self):
        db.session.add(self)
        db.session.commit()

    def update(self):
         db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()