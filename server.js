const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const path = require('path');

const server = express();


server.use(cors({
    origin: 'http://localhost:63342'
}));

server.use(express.json());
server.use(express.urlencoded({ extended: false }));
server.use(express.static(path.join(__dirname, 'public')));
server.use(bodyParser.json());
server.use(helmet());
server.use(logger('dev'));

// Connect to MongoDB
mongoose.Promise = global.Promise;
mongoose.connect('mongodb+srv://hsadmin:MochiBean421@cluster0.av8kthx.mongodb.net/CareFinder');

// Set up the routes
const apiRoutes = require('./src/routes/api-routes');
server.use('/api', apiRoutes);

const loginRoutes = require('./src/routes/login-routes');
server.use('/auth', loginRoutes);


const authenticateToken = require('./src/middleware/verifyApiKey')
server.use('/api', authenticateToken)



// Handle errors
const errorHandlers = require('./src/middleware/error-handlers');
server.use(errorHandlers.invalidRoute);
server.use(errorHandlers.validationErrors);

module.exports = server;
