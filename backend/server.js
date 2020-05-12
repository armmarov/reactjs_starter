const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const passport = require("passport");
dotenv.config();

// Routes
const usersRoutes = require('./routes/users.route');

app.use(cors());
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }))

// Passport middleware
app.use(passport.initialize());
// Passport config
require("./config/passport")(passport);

// Routing
app.use('/api/v1/user', usersRoutes);

app.listen(process.env.PORT, function() {
    console.log("Server is running on Port: " + process.env.PORT);
    app.emit( "app_started" )
});

module.exports = app