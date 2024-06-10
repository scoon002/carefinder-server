const Hospitals = require('../models/hospital.js');

const HospitalController = {
    // Get all hospitals
    read: async (req, res) => {
        try {
            let query = {};

            if (req.query.provider_id) {
                query.provider_id = parseInt(req.query.provider_id);
            }
            if (req.query.city) {
                query.city = new RegExp(req.query.city, 'i');
            }
            if (req.query.state) {
                query.state = new RegExp(req.query.state, 'i');
            }
            if (req.query.county_name) {
                query.county_name = new RegExp(req.query.county_name, 'i');
            }
            if (req.query.hospital_name) {
                query.hospital_name = new RegExp(req.query.hospital_name, 'i');
            }
            if (req.query.hospital_type) {
                query.hospital_type = new RegExp(req.query.hospital_type, 'i');
            }
            if (req.query.hospital_ownership) {
                query.hospital_ownership = new RegExp(req.query.hospital_ownership, 'i');
            }
            if (req.query.emergency_services) {
                query.emergency_services = req.query.emergency_services === 'true';
            }

            // Find hospitals based on the constructed query
            const hospitals = await Hospitals.find(query).exec();
            res.json({data: hospitals});
        } catch (err) {
            res.status(500).json({message: err.message});
        }
    },

    // Create a new hospital
    create: async (req, res) => {
        const hospital = new Hospitals({
            provider_id: req.body.provider_id,
            hospital_name: req.body.hospital_name,
            address: req.body.address,
            city: req.body.city,
            state: req.body.state,
            zip_code: req.body.zip_code,
            county_name: req.body.county_name,
            phone_number: req.body.phone_number,
            hospital_type: req.body.hospital_type,
            hospital_ownership: req.body.hospital_ownership,
            emergency_services: req.body.emergency_services,
            location: req.body.location
        });

        try {
            const newHospital = await hospital.save();
            res.status(201).json(newHospital);
        } catch (err) {
            res.status(400).json({message: err.message});
        }
    },

    // Update a hospital
    update: async (req, res) => {
        try {
            const hospital = await Hospitals.findById(req.params.id);
            if (!hospital) {
                return res.status(404).json({ message: 'Hospital not found' });
            }

            // Update fields
            hospital.provider_id = req.body.provider_id;
            hospital.hospital_name = req.body.hospital_name;
            hospital.address = req.body.address;
            hospital.city = req.body.city;
            hospital.state = req.body.state;
            hospital.zip_code = req.body.zip_code;
            hospital.county_name = req.body.county_name;
            hospital.phone_number = req.body.phone_number;
            hospital.hospital_type = req.body.hospital_type;
            hospital.hospital_ownership = req.body.hospital_ownership;
            hospital.emergency_services = req.body.emergency_services;
            hospital.location = req.body.location;

            const updatedHospital = await hospital.save();
            res.json(updatedHospital);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    },


// Generalized delete method
    deleteHospitals: async (req, res) => {
        try {
            let query = {};

            if (req.query.provider_id) {
                query.provider_id = parseInt(req.query.provider_id);
            }
            if (req.query.city) {
                query.city = new RegExp(req.query.city, 'i');
            }
            if (req.query.state) {
                query.state = new RegExp(req.query.state, 'i');
            }
            if (req.query.county_name) {
                query.county_name = new RegExp(req.query.county_name, 'i');
            }
            if (req.query.hospital_name) {
                query.hospital_name = new RegExp(req.query.hospital_name, 'i');
            }
            if (req.query.hospital_type) {
                query.hospital_type = new RegExp(req.query.hospital_type, 'i');
            }
            if (req.query.hospital_ownership) {
                query.hospital_ownership = new RegExp(req.query.hospital_ownership, 'i');
            }
            if (req.query.emergency_services) {
                query.emergency_services = req.query.emergency_services === 'true';
            }

            // Delete hospitals based on the constructed query
            const result = await Hospitals.deleteMany(query);
            if (result.deletedCount === 0) {
                return res.status(404).json({ message: 'No matching hospitals found' });
            }
            res.json({ message: 'Deleted Hospitals' });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },


    // patch update hospital
    patch: async (req, res) => {
        try {
            const hospital = await Hospitals.findById(req.params.id);
            if (!hospital) {
                return res.status(404).json({message: 'Hospital not found'});
            }

            // update only provided fields
            Object.entries(req.body).forEach(([key, value]) => {
                hospital[key] = value;
            });

            const updatedHospital = await hospital.save();
            res.json(updatedHospital);
        } catch (err) {
            res.status(400).json({message: err.message});
        }
    }

};

module.exports = HospitalController;