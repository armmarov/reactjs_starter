const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
var pool = require('./database');
const keys = require("./keys");
const opts = {};

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;

module.exports = passport => {
  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
      pool.getConnection(function(err, connection) {
        if (err) return response.fail(errors.ERR0015 + " (Connection Error: " + err + ")", res)
        connection.query('SELECT * FROM `users` WHERE id = ' + jwt_payload.id, function(err, rows, fields) {
            console.log(rows)
            if(err) {
                connection.release();
                return done(null, false);
            }

            connection.release();
            return done(null, rows);
        });
    });
    })
  );
};