const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../server');
const errMsg = require('../config/errors');

// Configuration for chai
chai.use(chaiHttp);
chai.should();

const username = "testuser" + parseInt((Math.random() * 100), 10)
const password = "testpassword" + parseInt((Math.random() * 100), 10)
var token = "WEBAPP "
var userid = ""

let baseUrl = 'http://localhost:3050'

describe("Users test cases", () => {
    describe("POST /api/v1/user/register", () => {

        // Register new account
        it("should register new record", (done) => {
            const newTestUser = {
                username : username,
                password : password,
                passwordconfirm : password,
                email : "testmail@gmail.com",
                fullname : "testfirstname"
            }
            chai.request(baseUrl)
                .post('/api/v1/user/register')
                .set('content-type', 'application/x-www-form-urlencoded')
                .send(newTestUser)
                .end((err, res) => {
                    // console.log("Response", JSON.parse(res.text).values, JSON.parse(res.text).status)
                    chai.assert.equal(JSON.parse(res.text).status, 200, "Wrong error code")
                    chai.assert(JSON.parse(res.text).values, "No return value")
                    done();                    
                })
        })

        // Unable to register new account with empty username
        it("should not be able to register new account with empty username", (done) => {
            const newTestUser = {
                username : "",
                password : password,
                passwordconfirm : password,
                email : "testmail@gmail.com",
                fullname : "testfirstname"
            }
            chai.request(baseUrl)
                .post('/api/v1/user/register')
                .set('content-type', 'application/x-www-form-urlencoded')
                .send(newTestUser)
                .end((err, res) => {
                    // console.log("Response", JSON.parse(res.text).values, JSON.parse(res.text).status)
                    chai.assert.equal(JSON.parse(res.text).status, 400, "Wrong error code")
                    chai.assert.equal(JSON.parse(res.text).values.username, errMsg.ERR0005, "Wrong error message")
                    done();                    
                })
        })

        // Unable to register new account with empty password
        it("should not be able to register new account with empty password", (done) => {
            const newTestUser = {
                username : username,
                password : "",
                passwordconfirm : password,
                email : "testmail@gmail.com",
                fullname : "testfirstname"
            }
            chai.request(baseUrl)
                .post('/api/v1/user/register')
                .set('content-type', 'application/x-www-form-urlencoded')
                .send(newTestUser)
                .end((err, res) => {
                    // console.log("Response", JSON.parse(res.text).values, JSON.parse(res.text).status)
                    chai.assert.equal(JSON.parse(res.text).status, 400, "Wrong error code")
                    chai.assert.equal(JSON.parse(res.text).values.password, errMsg.ERR0006, "Wrong error message")
                    done();                    
                })
        })

        // Unable to register new account with wrong password length
        it("should not be able to register new account with wrong password length", (done) => {
            const newTestUser = {
                username : username,
                password : "aaa",
                passwordconfirm : "aaa",
                email : "testmail@gmail.com",
                fullname : "testfirstname"
            }
            chai.request(baseUrl)
                .post('/api/v1/user/register')
                .set('content-type', 'application/x-www-form-urlencoded')
                .send(newTestUser)
                .end((err, res) => {
                    // console.log("Response", JSON.parse(res.text).values, JSON.parse(res.text).status)
                    chai.assert.equal(JSON.parse(res.text).status, 400, "Wrong error code")
                    chai.assert.equal(JSON.parse(res.text).values.password, errMsg.ERR0014, "Wrong error message")
                    done();                    
                })
        })

        // Unable to register new account with empty confirm password
        it("should not be able to register new account with empty confirm password", (done) => {
            const newTestUser = {
                username : username,
                password : password,
                passwordconfirm : "",
                email : "testmail@gmail.com",
                fullname : "testfirstname"
            }
            chai.request(baseUrl)
                .post('/api/v1/user/register')
                .set('content-type', 'application/x-www-form-urlencoded')
                .send(newTestUser)
                .end((err, res) => {
                    // console.log("Response", JSON.parse(res.text).values, JSON.parse(res.text).status)
                    chai.assert.equal(JSON.parse(res.text).status, 400, "Wrong error code")
                    chai.assert.equal(JSON.parse(res.text).values.passwordconfirm, errMsg.ERR0007, "Wrong error message")
                    done();                    
                })
        })

        // Unable to register new account with empty wrong confirm password
        it("should not be able to register new account with empty wrong confirm password", (done) => {
            const newTestUser = {
                username : username,
                password : password,
                passwordconfirm : "aasdadasdad",
                email : "testmail@gmail.com",
                fullname : "testfirstname"
            }
            chai.request(baseUrl)
                .post('/api/v1/user/register')
                .set('content-type', 'application/x-www-form-urlencoded')
                .send(newTestUser)
                .end((err, res) => {
                    // console.log("Response", JSON.parse(res.text).values, JSON.parse(res.text).status)
                    chai.assert.equal(JSON.parse(res.text).status, 400, "Wrong error code")
                    chai.assert.equal(JSON.parse(res.text).values.passwordconfirm, errMsg.ERR0008, "Wrong error message")
                    done();                    
                })
        })

        // Unable to register new account with empty firstname
        it("should not be able to register new account with empty firstname", (done) => {
            const newTestUser = {
                username : username,
                password : password,
                passwordconfirm : password,
                email : "testmail@gmail.com",
                fullname : ""
            }
            chai.request(baseUrl)
                .post('/api/v1/user/register')
                .set('content-type', 'application/x-www-form-urlencoded')
                .send(newTestUser)
                .end((err, res) => {
                    // console.log("Response", JSON.parse(res.text).values, JSON.parse(res.text).status)
                    chai.assert.equal(JSON.parse(res.text).status, 400, "Wrong error code")
                    chai.assert.equal(JSON.parse(res.text).values.fullname, errMsg.ERR0009, "Wrong error message")
                    done();                    
                })
        })

        // Unable to register new account with empty lastname
        it("should not be able to register new account with empty lastname", (done) => {
            const newTestUser = {
                username : username,
                password : password,
                passwordconfirm : password,
                email : "testmail@gmail.com",
                fullname : "testfirstname"
            }
            chai.request(baseUrl)
                .post('/api/v1/user/register')
                .set('content-type', 'application/x-www-form-urlencoded')
                .send(newTestUser)
                .end((err, res) => {
                    // console.log("Response", JSON.parse(res.text).values, JSON.parse(res.text).status)
                    chai.assert.equal(JSON.parse(res.text).status, 400, "Wrong error code")
                    chai.assert.equal(JSON.parse(res.text).values.last_name, errMsg.ERR0010, "Wrong error message")
                    done();                    
                })
        })

        // Unable to register new account with empty email
        it("should not be able to register new account with empty email", (done) => {
            const newTestUser = {
                username : username,
                password : password,
                passwordconfirm : password,
                email : "",
                fullname : "testfirstname"
            }
            chai.request(baseUrl)
                .post('/api/v1/user/register')
                .set('content-type', 'application/x-www-form-urlencoded')
                .send(newTestUser)
                .end((err, res) => {
                    // console.log("Response", JSON.parse(res.text).values, JSON.parse(res.text).status)
                    chai.assert.equal(JSON.parse(res.text).status, 400, "Wrong error code")
                    chai.assert.equal(JSON.parse(res.text).values.email, errMsg.ERR0011, "Wrong error message")
                    done();                    
                })
        })

        // Unable to register new account with wrong email
        it("should not be able to register new account with wrong email", (done) => {
            const newTestUser = {
                username : username,
                password : password,
                passwordconfirm : password,
                email : "testmail@aaa",
                fullname : "testfirstname"
            }
            chai.request(baseUrl)
                .post('/api/v1/user/register')
                .set('content-type', 'application/x-www-form-urlencoded')
                .send(newTestUser)
                .end((err, res) => {
                    // console.log("Response", JSON.parse(res.text).values, JSON.parse(res.text).status)
                    chai.assert.equal(JSON.parse(res.text).status, 400, "Wrong error code")
                    chai.assert.equal(JSON.parse(res.text).values.email, errMsg.ERR0012, "Wrong error message")
                    done();                    
                })
        })
    
    })

    describe("POST /api/v1/user/login", () => {

        // Login account
        it("should be able to login", (done) => {
            const testUser = {
                username : username,
                password : password
            }
            chai.request(baseUrl)
                .post('/api/v1/user/login')
                .set('content-type', 'application/x-www-form-urlencoded')
                .send(testUser)
                .end((err, res) => {
                    // console.log("Response", JSON.parse(res.text).values, JSON.parse(res.text).status)
                    chai.assert.equal(JSON.parse(res.text).status, 200, "Wrong error code")
                    chai.assert(JSON.parse(res.text).values.token, "No token")
                    token = token + JSON.parse(res.text).values.token;
                    done();                    
                })
        })

        // Cannot login with empty username
        it("should not be able to login if empty username", (done) => {
            const testUser = {
                username : "",
                password : password
            }
            chai.request(baseUrl)
                .post('/api/v1/user/login')
                .set('content-type', 'application/x-www-form-urlencoded')
                .send(testUser)
                .end((err, res) => {
                    // console.log("Response", JSON.parse(res.text).values.username, JSON.parse(res.text).status)
                    chai.assert.equal(JSON.parse(res.text).status, 400, "Wrong error code")
                    chai.assert.equal(JSON.parse(res.text).values.username, errMsg.ERR0005, "Wrong error message")
                    done();                    
                })
        })

        // Cannot login with empty password
        it("should not be able to login if empty password", (done) => {
            const testUser = {
                username : username,
                password : ""
            }
            chai.request(baseUrl)
                .post('/api/v1/user/login')
                .set('content-type', 'application/x-www-form-urlencoded')
                .send(testUser)
                .end((err, res) => {
                    // console.log(res.text)
                    // console.log("Response", JSON.parse(res.text).values.password, JSON.parse(res.text).status)
                    chai.assert.equal(JSON.parse(res.text).status, 400, "Wrong error code")
                    chai.assert.equal(JSON.parse(res.text).values.password, errMsg.ERR0006, "Wrong error message")
                    done();                    
                })
        })

        // Cannot login with unregistered username
        it("should not be able to login with unregistered username", (done) => {
            const testUser = {
                username : username + "aaa",
                password : password
            }
            chai.request(baseUrl)
                .post('/api/v1/user/login')
                .set('content-type', 'application/x-www-form-urlencoded')
                .send(testUser)
                .end((err, res) => {
                    // console.log("Response", JSON.parse(res.text).values, JSON.parse(res.text).status)
                    chai.assert.equal(JSON.parse(res.text).status, 400, "Wrong error code")
                    chai.assert.equal(JSON.parse(res.text).values, errMsg.ERR0017, "Wrong error message")
                    done();                    
                })
        })

        // Cannot login with wrong password
        it("should not be able to login with wrong password", (done) => {
            const testUser = {
                username : username,
                password : password + "aaa"
            }
            chai.request(baseUrl)
                .post('/api/v1/user/login')
                .set('content-type', 'application/x-www-form-urlencoded')
                .send(testUser)
                .end((err, res) => {
                    // console.log("Response", JSON.parse(res.text).values, JSON.parse(res.text).status)
                    chai.assert.equal(JSON.parse(res.text).status, 400, "Wrong error code")
                    chai.assert.equal(JSON.parse(res.text).values, errMsg.ERR0018, "Wrong error message")
                    done();                    
                })
        })
    
    })

    describe("GET /api/v1/user/getallusers", () => {
        // Register new account
        it("should be able to get all users", (done) => {
            chai.request(baseUrl)
                .get('/api/v1/user/getallusers')
                .set("Authorization", token)
                .set('content-type', 'application/x-www-form-urlencoded')
                .end((err, res) => {
                    // console.log("Response", JSON.parse(res.text).values, JSON.parse(res.text).status)
                    chai.assert.equal(JSON.parse(res.text).status, 200, "Wrong error code")
                    chai.assert(JSON.parse(res.text).values, "No return value")
                    for(var i=0; i< JSON.parse(res.text).values.length; i++){
                        if(JSON.parse(res.text).values[i].username == username) {
                            userid = JSON.parse(res.text).values[i].id;
                        }
                    }
                    done();                    
                })
        })
    });

    describe("GET /api/v1/user/getuserbyid", () => {
        // Register new account
        it("should be able to get user by id", (done) => {
            chai.request(baseUrl)
                .get('/api/v1/user/getuserbyid/' + userid)
                .set("Authorization", token)
                .set('content-type', 'application/x-www-form-urlencoded')
                .end((err, res) => {
                    // console.log("Response", res.text)
                    chai.assert.equal(JSON.parse(res.text).status, 200, "Wrong error code")
                    chai.assert(JSON.parse(res.text).values, "No return value")
                    done();                    
                })
        })
    });

    describe("PUT /api/v1/user/updateuserbyid", () => {
        // Register new account
        it("should be able to update user by id", (done) => {
            const item_to_update = {
                password : "password113",
                fullname : "abcdddd"
            }
            chai.request(baseUrl)
                .put('/api/v1/user/updateuserbyid/' + userid)
                .set("Authorization", token)
                .set('content-type', 'application/x-www-form-urlencoded')
                .send(item_to_update)
                .end((err, res) => {
                    // console.log("Response", JSON.parse(res.text).values, JSON.parse(res.text).status)
                    chai.assert.equal(JSON.parse(res.text).status, 200, "Wrong error code")
                    chai.assert(JSON.parse(res.text).values, "No return value")
                    done();                    
                })
        })
    });

    describe("DELETE /api/v1/user/deleteuserbyid", () => {
        // Register new account
        it("should be able to delete user by id", (done) => {
            chai.request(baseUrl)
                .delete('/api/v1/user/deleteuserbyid/' + userid)
                .set("Authorization", token)
                .set('content-type', 'application/x-www-form-urlencoded')
                .end((err, res) => {
                    // console.log("Response", JSON.parse(res.text).values, JSON.parse(res.text).status)
                    chai.assert.equal(JSON.parse(res.text).status, 200, "Wrong error code")
                    chai.assert(JSON.parse(res.text).values, "No return value")
                    done();                    
                })
        })
    });
})