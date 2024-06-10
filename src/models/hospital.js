const mongoose = require('mongoose')

const HospitalSchema = new mongoose.Schema ({
    provider_id: { type: Number, unique: true, trim: true },
    hospital_name: { type: String, trim: true },
    address: { type: String, trim: true },
    city: { type: String, trim: true },
    state: { type: String, trim: true },
    zip_code: { type: Number, trim: true },
    county_name: { type: String, trim: true },
    phone_number: { type: String, trim: true },
    hospital_type: { type: String, trim: true },
    hospital_ownership: { type: String, trim: true },
    emergency_services: { type: Boolean },
    location: { type: String, trim: true}
})


module.exports = mongoose.model('Hospital', HospitalSchema)

