const Validator = require('validator');
const isEmpty = require('is-empty');
const errors = require("../config/errors");

module.exports = function validateRegisterInput(data) {
    let errorMsg = {};

    data.username = !isEmpty(data.username) ? data.username : "";
    data.password = !isEmpty(data.password) ? data.password : "";
    data.fullname = !isEmpty(data.fullname) ? data.fullname : "";
    data.email = !isEmpty(data.email) ? data.email : "";
    
    if(Validator.isEmpty(data.username)) {
        errorMsg.username = errors.ERR0005;
    }

    if(Validator.isEmpty(data.password)) {
        errorMsg.password = errors.ERR0006;
    } else if(!Validator.isLength(data.password, { min: 6, max: 30})) {
        errorMsg.password = errors.ERR0014;
    }

    if(Validator.isEmpty(data.fullname)) {
        errorMsg.fullname = errors.ERR0009;
    }

    if(Validator.isEmpty(data.email)) {
        errorMsg.email = errors.ERR0011;
    } else if(!Validator.isEmail(data.email)) {
        errorMsg.email = errors.ERR0012;
    }

    return {
        errorMsg,
        isValid: isEmpty(errorMsg)
    }
}