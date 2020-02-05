'use strict';
const 
  colors = require('colors'),
  express = require('express'),
  bodyParser = require('body-parser'),
  app = express(); // creates express http server



const connectMongo = require('./lib/dbModels/connection');

//for now I am keeping it as an asynchronous connection
//later on might need to start the app once this DB connection is set.
connectMongo();

app.disable('x-powered-by');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.enable('trust proxy');
const routes = require('./lib/router');

app.use('/', routes);

// Sets server port and logs message on success
app.listen(process.env.PORT || 9447, () => console.log('Whis'.green + ' is up and ready to serve on port: '.blue + '9447'.green));
