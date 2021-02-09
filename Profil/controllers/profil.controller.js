const Profil = require('../models/profil.model.js');

exports.create = (req, res) => {
    if(!req.body.content) {
        return res.status(400).send({
            message: "Profil content can not be empty"
        });
    }

    if(!req.body.id) {
        return res.status(400).send({
            message: "This user need an ID"
        });
    }

    const profil = new Profil({
        userId: req.body.id,
        email: req.body.email,
        nom: req.body.nom,
        prenom: req.body.prenom,
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
    Profil.findById(req.params.profilId)
        .then(profil => {
            if(!profil) {
                return res.status(404).send({
                        message: "Profil not found with id " + req.params.profilId
                });
            }
            res.send(profil);
        }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Profil not found with id " + req.params.profilId
            });
        }
        return res.status(500).send({
            message: "Error retrieving profil with id " + req.params.profilId
        });
    });
};

exports.update = (req, res) => {
    // Validate Request
    if(!req.body.content) {
        return res.status(400).send({
            message: "Profil content can not be empty"
        });
    }

    Profil.findByIdAndUpdate(req.params.profilId, {
        id: req.body.id,
        email: req.body.email,
        nom: req.body.nom,
        prenom: req.body.prenom
    }, {new: true})
        .then(profil => {
            if(!profil) {
                return res.status(404).send({
                    message: "Profil not found with id " + req.params.profilId
                });
            }
            res.send(profil);
        }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Profil not found with id " + req.params.profilId
            });
        }
        return res.status(500).send({
            message: "Error updating profil with id " + req.params.profilId
        });
    });
};

exports.delete = (req, res) => {
    Profil.findByIdAndRemove(req.params.profilId)
        .then(profil => {
            if(!profil) {
                return res.status(404).send({
                    message: "Profil not found with id " + req.params.profilId
                });
            }
            res.send({message: "Profil deleted successfully!"});
        }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Profil not found with id " + req.params.profilId
            });
        }
        return res.status(500).send({
            message: "Could not delete profil with id " + req.params.profilId
        });
    });

};