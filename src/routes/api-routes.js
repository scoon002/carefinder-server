/**
 * api-routes.js - Application routing
 *
 * Copyright notice at the end of the file.
 *
 * @type {createApplication}
 */

const express = require('express');

// Import the necessary route files and controllers
const hospitalsRoutes = require('./hospitals-routes');
const apiController = require('../controllers/apiController');
const adminOnly = require('../middleware/adminOnly');
const verifyApiKey = require('../middleware/verifyApiKey')

const router = express.Router();

// Route for handling hospital-related requests
router.use('/hospitals', hospitalsRoutes);


// ALL REQUIRED API KEY ENDPOINTS:


// http://localhost:3000/api/apikey
router.post('/apikey', apiController.createApiKey);


// api/apikey/ or api/apikey/3187
router.delete('/apikey/:keyId', verifyApiKey, adminOnly, apiController.deleteApiKey);
router.delete('/apikey/', verifyApiKey, adminOnly, apiController.deleteAllApiKeys);


// http://localhost:3000/api/apikey/
router.get('/apikey/', verifyApiKey, adminOnly, apiController.getAllApiKeys);

// http://localhost:3000/api/apikey/metadata
router.get('/apikey/metadata', apiController.getApiKeyMetadata);

// http://localhost:3000/api/apikey/metadata/3187
router.get('/apikey/metadata/:keyId', apiController.getApiKeyById);


module.exports = router;
