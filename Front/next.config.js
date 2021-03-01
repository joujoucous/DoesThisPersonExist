require('dotenv').config();

module.exports = {
    env: {
        AUTH_HOST: process.env.AUTH_HOST,
        PROFIL_HOST: process.env.PROFIL_HOST,
        FACES_HOST: process.env.FACES_HOST
    },
}