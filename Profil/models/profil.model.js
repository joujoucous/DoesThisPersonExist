const mongoose = require('mongoose');

const ProfilSchema = mongoose.Schema({
    userId: String,
    email: String,
    username: String
});

module.exports = mongoose.model('Profil', ProfilSchema);