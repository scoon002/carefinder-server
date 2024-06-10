const ApiKeyModel = require('../models/api');

const ApiKeyController = {
    // post
    createApiKey: async (req, res) => {
        try {
            // Generate a unique API key
            const apiKeyValue = generateUniqueApiKey();

            const keyId = Math.floor(1000 + Math.random() * 9000);

            // Create a new API key object with data from the request body
            const newApiKey = new ApiKeyModel({
                keyId: keyId,
                username: req.body.username,
                apikey: apiKeyValue,
                level: req.body.level,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            });

            // Save the new API key to the database
            await newApiKey.save();

            // Return the created API key
            res.status(201).json(newApiKey);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },

    // delete
    deleteApiKey: async (req, res) => {
        try {
            const keyId = req.params.keyId; // Get the keyId from the request parameters

            // Delete the API key from the database
            const result = await ApiKeyModel.findOneAndDelete({ keyId: keyId });

            if (result) {
                res.status(200).json({ message: 'API Key deleted successfully' });
            } else {
                res.status(404).json({ message: 'API Key not found' });
            }
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },

    // delete
    deleteAllApiKeys: async (req, res) => {
        try {
            await ApiKeyModel.deleteMany({});

            res.status(200).json({ message: 'All API keys deleted successfully.'})
        } catch (err) {
            res.status(500).json({ message: err.message })
        }
    },

    // get
    getAllApiKeys: async (req, res) => {
        try {
            const apiKeys = await ApiKeyModel.find({});

            res.status(200).json(apiKeys);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },

    // get metadata
    getApiKeyMetadata: async (req, res) => {
        try {
            const apiKeyMetaData = await ApiKeyModel.find({}).select('keyId username level createdAt updatedAt -_id');

            res.status(200).json(apiKeyMetaData);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },

    // get specific metadata
    getApiKeyById: async (req, res) => {
        try {
            const keyId = req.params.keyId; // get the keyId from the request params

            const apiKeyMetaData = await ApiKeyModel.findOne({ keyId: keyId})
                .select('keyId username level createdAt updatedAt -_id');

            if (apiKeyMetaData) {
                res.status(200).json(apiKeyMetaData);
            } else {
                res.status(404).json({ message: 'API Key not found' });
            }
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }

};

const crypto = require('crypto');

function generateUniqueApiKey() {
    return crypto.randomBytes(16).toString('hex');
}


module.exports = ApiKeyController;
