const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;
const Op = db.Sequelize.Op;
const request = require('request');
require("dotenv").config();

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

function createUserInProfiLService(id, username, email) {
    /* Ajout de l'utilisateur dans le service profil */
     request.post({
         url: `http://${process.env.HOST_CREATE_PROFILE}:${process.env.PORT_CREATE_PROFILE}/profil`,
         json: true,
         body: {
             "userId": id,
             "username": username,
             "email": email
         }
     }, (err, res, body) => {
         if (err) {
             return console.log(err);
         }
     });
}

exports.signup = (req, res) => {
    // Save User to Database
    User.create({
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8)
    }).then(result => {
        createUserInProfiLService(result.id, result.username, result.email);
    }).catch(err => {
            return res.status(500).send({ message: err.message });
        });
    res.json({
        message: "Utilisateur enregistré avec succès!"
    });

};

exports.signin = (req, res) => {
    User.findOne({
        where: {
            username: req.body.username
        }
    })
        .then(user => {
            if (!user) {
                return res.status(404).send({ message: "User Not found." });
            }

            var passwordIsValid = bcrypt.compareSync(
                req.body.password,
                user.password
            );

            if (!passwordIsValid) {
                return res.status(401).send({
                    accessToken: null,
                    message: "Mot de pass invalid!"
                });
            }

            var token = jwt.sign({ id: user.id }, config.secret, {
                expiresIn: 86400 // 24 hours
            });

            res.status(200).send({
                id: user.id,
                username: user.username,
                email: user.email,
                accessToken: token
            });
        })
        .catch(err => {
            return res.status(500).send({ message: err.message });
        });
};