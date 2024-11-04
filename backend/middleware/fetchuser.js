const jwt = require('jsonwebtoken');
const User = require('../models/User');
const JWT_SECRET = "iamaditya*p";


const fetchuser = async (req, res, next) => {
    const token =  req.header('auth-token');
    
    if (!token) {
        return res.status(401).send({sucess: false, error : "Access denied. No token provided."});
    }
    
    try {
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.user;

        const isValid = await User.findById(req.user.id);

        if (!isValid) {
            return res.status(401).send({sucess: false, isvalid: false, error : "Access denied. User didn't verify with this token."});
        }

        next();
    } catch (error) {
        res.status(401).send({sucess: false, error : "Access denied. Please provide a valid token."});
    }
}


module.exports = fetchuser