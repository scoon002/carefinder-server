const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');



exports.login = async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username });
        if (!user) {
            return res.status(401).json({ message: 'Authentication failed' });
        }

        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) {
            return res.status(401).json({ message: 'Authentication failed' });
        }

        const token = jwt.sign(
            { userId: user._id, level: user.level },
            'yourSecretKey',
            { expiresIn: '1h' }
        );

        res.status(200).json({ token: token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
