const adminOnly = (req, res, next) => {
    if (req.apiKey && req.apiKey.level === 1) {
        next();
    } else {
        res.status(403).json({ message: 'Admin access required' });
    }
};

module.exports = adminOnly;
