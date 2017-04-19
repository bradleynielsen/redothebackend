require('dotenv').config()
const app = require('express')(),
      {static} = require('exress'),
      {json, urlencoded}=require('body-parser'),
      serviceRouter = require('./services'),
      mongoose = require('mongoose'),
      {connection} = require('mongoose'),
      cors = require('cors'),
      morgan = require('morgan'),
      passport = require('passport'),
      {mongoURI, port, stripeKey, host} = require('./config'),
      createStrategies = require('./strategies')

// db config
mongoose.promise = global.Promise;
connection.on('error', console.error.bind(console, 'connection error:'))
connection.once('open', ()=> console.log(`connected to ${mongoURI}!`))


// mids
app.use(urlencoded({extended:true}))
app.use(json())
app.use(passport.initialize())
createStrategies()
app.use(static('uploads'))
app.use(static('uploads'))
app.use(morgan(''))
app.use(cors())
app.use('/v1', serviceRouter)

app.listen(port, console.log(`http://${host}:${port}`))
