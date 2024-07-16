const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    // const token = req.header('token') && req.header('token').split(' ')[1];
    const token = req.header('token');
    console.log("receied", token);
    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    // console.log(req.body);
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.user;
        next();
    } catch (err) {
        res.status(401).json({ message: 'Token is not valid' });
    }
};
