
const ApiKeyModel = require('../models/api');

const verifyApiKey = async (req, res, next) => {
    try {
        const apiKeyHeader = req.headers['x-api-key'];
        if (!apiKeyHeader) {
            return res.status(401).json({ message: 'API Key is required' });
        }

        const apiKey = await ApiKeyModel.findOne({ apikey: apiKeyHeader });
        if (!apiKey) {
            return res.status(401).json({ message: 'Invalid API Key' });
        }

        // Attach API key info to the request object
        req.apiKey = apiKey;
        next();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = verifyApiKey;
