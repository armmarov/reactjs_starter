'use strict';

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require("../config/keys");
var response = require('../config/resformat');
var pool = require('../config/database');
var errors = require('../config/errors');
var query = require('../config/queryBuilder');

const validateRegisterInput = require('../validation/register');
const validateLoginInput = require('../validation/login');

exports.getAllUsers = function(req, res) {
    console.log("getAllUsers")
    pool.getConnection(function(err, connection) {
        if (err) return response.fail(errors.ERR0015 + " (Connection Error: " + err + ")", res)
        connection.query('SELECT * FROM `users`', function(err, rows, fields) {
            console.log(rows)
            if(err) {
                connection.release();
                return response.fail(errors.ERR0001 + " (SQL Error: " + err + ")", res)
            }

            connection.release();
            return response.ok(rows, res);
        });
    });
};

exports.getUserByID = function(req, res) {
    console.log("getUserByID", req.params.id)

    if(req.params.id == null || req.params.id == undefined) {
        return response.fail(errors.ERR0002, res)
    }

    pool.getConnection(function(err, connection) {
        if (err) return response.fail(errors.ERR0015 + " (Connection Error: " + err + ")", res)
        connection.query('SELECT * FROM `users` WHERE id = ' + req.params.id, function(err, rows, fields) {
            console.log(rows)
            if(err) {
                connection.release();
                return response.fail(errors.ERR0001 + " (SQL Error: " + err + ")", res)
            }

            connection.release();
            return response.ok(rows, res);
        });
    });
};

exports.updateUserByID = function(req, res) {
    console.log("updateUserByID", req.params.id, req.body)
    let fields = [];
    let values = [];

    if(req.params.id == null || req.params.id == undefined) {
        return response.fail(errors.ERR0002, res)
    }

    Object.keys(req.body).forEach(function(key) {
        fields.push(key);
        values.push({
            item: req.body[key],
            type: query.checkType(key)
        })
    });

    let id = {
        field: "id",
        no: req.params.id
    }
    console.log(fields, values)

    let queryStr = query.updateQueryBuilder('users', id, fields, values);
    pool.getConnection(function(err, connection) {
        if (err) return response.fail(errors.ERR0015 + " (Connection Error: " + err + ")", res)
        connection.query(queryStr, function(err, rows, fields) {
            console.log(rows)
            if(err) {
                connection.release();
                return response.fail(errors.ERR0001 + " (SQL Error: " + err + ")", res)
            }

            connection.release();
            return response.ok(rows, res);
        });
    });
};

exports.deleteUserByID = function(req, res) {
    console.log("getUserByID", req.params.id)

    if(req.params.id == null || req.params.id == undefined) {
        return response.fail(errors.ERR0002, res)
    }

    pool.getConnection(function(err, connection) {
        if (err) return response.fail(errors.ERR0015 + " (Connection Error: " + err + ")", res)
        connection.query('DELETE FROM `users` WHERE id = ' + req.params.id, function(err, rows, fields) {
            console.log(rows)
            if(err) {
                connection.release();
                return response.fail(errors.ERR0001 + " (SQL Error: " + err + ")", res)
            }

            connection.release();
            return response.ok(rows, res);
        });
    });
};

exports.registration = function(req,res) {
    console.log("REGISTRATION H", req.headers)
    console.log("REGISTRATION B", req.body)
    const { errorMsg, isValid } = validateRegisterInput(req.body);

    if(!isValid) {
        return response.fail(errorMsg, res)
    }

    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(req.body.password, salt, (err, hash) => {
            if(err) {
                return response.fail(errors.ERR0003 + " (Hashing Error: " + err + ")", res)
            }
            pool.getConnection(function(err, connection) {
                if (err) return response.fail(errors.ERR0015 + " (Connection Error: " + err + ")", res)
                connection.query('SELECT * FROM `users` WHERE username = "' + req.body.username + '"', function(err, rows, fields) {
                    console.log(rows)
                    if(err) {
                        // Exists
                        connection.release();
                        return response.fail(errors.ERR0001 + " (SQL Error: " + err + ")", res)
                    }
                    if(rows.length > 0) {
                        // Exists
                        console.log("EXISTED")
                        connection.release();
                        return response.fail(errors.ERR0004, res)
                    } else {
                        // Not exists
                        console.log("NOT EXISTED")
                        let values = ['username', 'password', 'email', 'fullname'];
                        let items = [
                            { item: req.body.username, type: 'string' },
                            { item: hash, type: 'string' },
                            { item: req.body.email, type: 'string' },
                            { item: req.body.fullname, type: 'string' },
                        ]
                        let queryStr = query.insertQueryBuilder('users', values, items);
                        connection.query(queryStr, function(err, rows, fields) {
                            connection.release();
                            if(err) return response.fail(errors.ERR0001 + " (SQL Error: " + err + ")", res)
                            console.log(rows)
                            return response.ok(rows, res)
                        });
                    }
                })
            });
        });
    });
};

exports.login = function(req,res) {

    const { errorMsg, isValid } = validateLoginInput(req.body);

    if(!isValid) {
        return response.fail(errorMsg, res);
    }

    const username = req.body.username;
    const password = req.body.password;

    pool.getConnection(function(err, connection) {
        if (err) return response.fail(errors.ERR0015 + " (Connection Error: " + err + ")", res)
        connection.query('SELECT * FROM `users` WHERE username = "' + username + '"', function(err, rows, fields) {
            if(err) {
                // Exists
                connection.release();
                return response.fail(errors.ERR0001 + " (SQL Error: " + err + ")", res)
            }
            if(rows.length > 0) {
                // Exists
                bcrypt.compare(password, rows[0].password).then(isMatch => {
                    if(isMatch) {
                        const payload = {
                            id: rows[0].id,
                            name: rows[0].username,
                            fullname: rows[0].fullname
                        };
    
                        jwt.sign(
                            payload,
                            keys.secretOrKey,
                            {
                                expiresIn: '24h'
                            },
                            (err, token) => {
                                connection.release();
                                console.log(token)
                                return response.ok({token: token, id: rows[0].id, name: rows[0].fullname}, res)
                            }
                        );
                    } else {
                        connection.release();
                        return response.fail(errors.ERR0018, res)
                    }
                })
                .catch(err => {
                    connection.release();
                    return response.fail(errors.ERR0018, res)
                });
                
            } else {
                connection.release();
                return response.fail(errors.ERR0017, res)
            }

        });
    });
}