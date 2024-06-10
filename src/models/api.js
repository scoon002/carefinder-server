const mongoose = require('mongoose')

const APISchema = new mongoose.Schema ({
    keyId: { type: Number, unique: true, trim: true },
    username: { type: String, trim: true },
    apikey: { type: String, trim: true },
    level: { type: Number, trim: true },
    createdAt: { type: String, trim: true },
    updatedAt: { type: String, trim: true },
})


module.exports = mongoose.model('api', APISchema)

