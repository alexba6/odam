

const express = require('express')
const bodyParser = require('body-parser')

const userRoute = require('./router/user')
const articleRouter = require('./router/article')

require('./addFullAdmin')

const app = express()



app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(bodyParser.json())

app.use('/api/user', userRoute)
app.use('/api/article', articleRouter)


module.exports = app