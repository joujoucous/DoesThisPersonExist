# coding: utf-8

#import sqlite3
from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from sqlalchemy import desc
import os
from flask_cors import CORS

# Initialize App
app = Flask(__name__)
CORS(app)
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


'''
GET /api/game/best/user/:id  ﻿﻿La meilleur game d'un joueur FAIT
GET /api/game/user/:id Toutes les  game d'un joueur FAIT
GET /api/game/:id Information d'une game FAIT
POST /api/game ﻿Création d'une game FAIT
PUT /api/game/:id Update d'une game FAIT
DELETE /api/game/:id Suppression d'une game FAIT
'''


# Meilleure Partie d'un Joueur
@app.route('/api/game/best/user/<user>', methods=['GET'])
def best_game_user(user):
    #stocke les games d'un joueur en ordre croissant et prend la premiere game
    all_parties_user = Partie.query.filter_by(user=user).order_by(desc(Partie.score)).limit(1).first()

    result = partie_schema.dump(all_parties_user)
    return jsonify(result)

# Toutes les Parties d'un Joueur
@app.route('/api/game/user/<user>', methods=['GET'])
def parties_user(user):
    all_parties_user = Partie.query.filter_by(user=user).all()

    result = parties_schema.dump(all_parties_user)
    return jsonify(result)

# Create Partie
@app.route('/api/game', methods=['POST'])
def add_partie():
    user = request.json['user']
    score = request.json['score']

    new_partie = Partie(user, score)

    db.session.add(new_partie)
    db.session.commit()

    return partie_schema.jsonify(new_partie)


# Information Partie
@app.route('/api/game/<id>', methods=['GET'])
def info_partie(id):
    partie_to_send = Partie.query.filter_by(id=id).first_or_404()

    return partie_schema.jsonify(partie_to_send)

# Update Partie
@app.route('/api/game/<id>', methods=['PUT'])
def update_partie(id):
    score_to_update = request.json['score']

    partie_to_update = Partie.query.filter_by(id=id).first_or_404()
    partie_to_update.score = score_to_update

    db.session.commit()

    return partie_schema.jsonify(partie_to_update)


# Delete Partie by id
@app.route('/api/game/<id>', methods=['DELETE'])
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
    app.run(debug=True, port=5009,host="0.0.0.0")