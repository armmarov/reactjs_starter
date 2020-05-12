let jwt = require('jsonwebtoken');
const keys = require("../config/keys");

let verifyToken = (req, res, next) => {
    let token = req.headers['x-access-token'] || req.headers['authorization']; // Express headers are auto converted to lowercase

    if(token != null) {
        if (token.startsWith('WEBAPP ')) {
            // Remove Bearer from string
            token = token.slice(10, token.length);
        }
    } else {
        return res.json({
            success: false,
            message: 'Auth token is not supplied'
            });
    }
    console.log(token)
    if (token) {
        jwt.verify(token, keys.secretOrKey, (err, decoded) => {
            if (err) {
                return res.json({
                success: false,
                message: 'Token is not valid'
                });
            } else {
                req.decoded = decoded;
                next();
            }
        });
    } else {
        return res.json({
            success: false,
            message: 'Auth token is not supplied'
        });
    }
};

module.exports = {
    verifyToken: verifyToken
}