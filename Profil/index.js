const express = require('express')
var bodyParser = require('body-parser')
const app = express()
const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('./swagger_output.json')

// Configuring the database
const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  });
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
mongoose.Promise = global.Promise;

// Connecting to the database

mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

require('./routes/profil.routes.js')(app);

app.listen(5006, () => {
    console.log("Serveur à l'écoute");
})

app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))