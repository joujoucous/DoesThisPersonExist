# coding: utf-8

#import sqlite3
from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
import os


# Initialize App
app = Flask(__name__)
basedir = os.path.abspath(os.path.dirname(__file__))

# Database Setup
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(basedir, 'db.sqlite')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
# Init db
db = SQLAlchemy(app)
# Init marshmallow
ma = Marshmallow(app)


# Partie Class/Model
class Partie(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user = db.Column(db.String(100))
    score = db.Column(db.Integer)

    def __init__(self, user, score):
        self.user = user
        self.score = score


# Partie Schema
class PartieSchema(ma.Schema):
    class Meta:
        fields = ('id', 'user', 'score')


# Init Schema
partie_schema = PartieSchema()
parties_schema = PartieSchema(many=True)


# Create Partie
@app.route('/partie', methods=['POST'])
def add_partie():
    user = request.json['user']
    score = request.json['score']

    new_partie = Partie(user, score)

    db.session.add(new_partie)
    db.session.commit()

    return partie_schema.jsonify(new_partie)


# Delete Partie by id
@app.route('/delete/<id>', methods=['DELETE'])
def delete_partie(id):

    partie_to_delete = Partie.query.filter_by(id=id).first_or_404()
    db.session.delete(partie_to_delete)
    db.session.commit()

    all_parties = Partie.query.all()
    result = parties_schema.dump(all_parties)
    return jsonify(result)


# Get All Parties
@app.route('/receive', methods=['GET'])
def get_parties():
    all_parties = Partie.query.all()
    result = parties_schema.dump(all_parties)
    return jsonify(result)

db.create_all()

# Run the Server
if __name__ == '__main__':
    app.run(debug=True)