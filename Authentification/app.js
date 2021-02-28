const bodyParser = require("body-parser");
const db = require("./models");

const app = require('express')()
const PORT = 5000;
const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('./swagger_output.json')

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  });

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.json({
        message: 'Welcome to the authentification micro service'
    });
});

require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);
db.sequelize.sync();

app.listen(PORT, () => console.log('Server started on port 5000'));

app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))