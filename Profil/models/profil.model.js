const mongoose = require('mongoose');

const ProfilSchema = mongoose.Schema({
    id: String,
    email: String,
    nom: String,
    prenom: String
});

module.exports = mongoose.model('Profil', ProfilSchema);