const Profil = require('../models/profil.model.js');

exports.create = (req, res) => {
    if(!(req.body.userId && req.body.email && req.body.username )) {
        return res.status(400).send({
            message: "Profil information are missing or body is empty"
        });
    }

    const profil = new Profil({
        userId: req.body.userId,
        email: req.body.email,
        username: req.body.username
    });

    profil.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Profil."
        });
    });
};

exports.findAll = (req, res) => {
    Profil.find()
        .then(profils => {
            res.send(profils);
        }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving profils."
        });
    });
};

exports.findOne = (req, res) => {
    Profil.findOne({userId: req.params.userId})
        .then(profil => {
            if(!profil) {
                return res.status(404).send({
                        message: "Profil not found with id " + req.params.userId
                });
            }
            res.send(profil);
        }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Profil not found with id " + req.params.userId
            });
        }
        return res.status(500).send({
            message: "Error retrieving profil with id " + req.params.userId
        });
    });
};

exports.update = (req, res) => {
    Profil.findOneAndUpdate({userId: req.params.userId}, req.body, {new: true, "overwrite": false})
        .then(profil => {
            if(!profil) {
                return res.status(404).send({
                    message: "Profil not found with id " + req.params.userId
                });
            }
            res.send(profil);
        }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Profil not found with id " + req.params.userId
            });
        }
        return res.status(500).send({
            message: "Error updating profil with id " + req.params.userId
        });
    });
};

exports.delete = (req, res) => {
    Profil.findOneAndRemove({userId: req.params.userId})
        .then(profil => {
            if(!profil) {
                return res.status(404).send({
                    message: "Profil not found with id " + req.params.userId
                });
            }
            res.send({message: "Profil deleted successfully!"});
        }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Profil not found with id " + req.params.userId
            });
        }
        return res.status(500).send({
            message: "Could not delete profil with id " + req.params.userId
        });
    });

};