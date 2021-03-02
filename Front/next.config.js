require('dotenv').config();

module.exports = {
    env: {
        AUTH_HOST: process.env.AUTH_HOST,
        PROFIL_HOST: process.env.PROFIL_HOST,
        FACES_HOST: process.env.FACES_HOST,
        GAMES_HOST: process.env.GAMES_HOST,
        GAMES_PORT: process.env.GAMES_PORT
    },
}