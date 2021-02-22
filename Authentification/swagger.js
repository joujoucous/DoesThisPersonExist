const swaggerAutogen = require('swagger-autogen')()

const outputFile = './swagger_output.json'
const endpointsFiles = ['./routes/auth.routes.js','./routes/user.routes.js' ]

swaggerAutogen(outputFile, endpointsFiles).then(() => {
    require('./app.js')
})