// not really implemented

const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema ({
    username: { type: String, trim: true },
    password: { type: String, trim: true },
    level: { type: Number, trim: true }
})

// Hash password before saving
userSchema.pre('save', async function(next) {
    if (this.isModified('password') || this.isNew) {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    }
    next();
});

module.exports = mongoose.model('user', userSchema)

