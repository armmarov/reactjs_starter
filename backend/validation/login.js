const Validator = require('validator');
const isEmpty = require('is-empty');
const errors = require("../config/errors");

module.exports = function validateLoginInput(data) {
    let errorMsg = {};

    data.username = !isEmpty(data.username) ? data.username : "";
    data.password = !isEmpty(data.password) ? data.password : "";
    
    if(Validator.isEmpty(data.username)) {
        errorMsg.username = errors.ERR0005;
    }

    if(Validator.isEmpty(data.password)) {
        errorMsg.password = errors.ERR0006;
    }
    console.log(errorMsg)
    return {
        errorMsg,
        isValid: isEmpty(errorMsg)
    }
}