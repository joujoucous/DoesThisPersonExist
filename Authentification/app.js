const express = require('express');
const bodyParser = require("body-parser");
const db = require("./models");

const app = express();
const PORT = 5000;


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

/*
app.post('/api/auth/checkToken',verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if(err) {
            res.sendStatus(403);
        }else {
            res.json({
                message: 'Post created...',
                authData
            })
        }
    });
    res.json({
        message: 'Post created'
    });
});


app.post('/api/auth/login', (req, res) => {

    console.log(req.body);

    jwt.sign({req}, 'secretkey', (err,token)=> {
        res.json({
           token: token
        });
    });
});

function verifyToken(req, res, next) {
    const bearerHeader = req.headers['authorization'];

    if(typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        req.token = bearerToken;
        next();
    }else {
        res.sendStatus(403)
    }
}

 */
app.listen(PORT, () => console.log('Server started on port 5000'));