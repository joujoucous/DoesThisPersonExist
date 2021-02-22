require("dotenv").config();

module.exports = {
    url: `mongodb://user:user@${process.env.DB_HOST}:${process.env.DB_PORT}/ProfilDB?authSource=admin`
}