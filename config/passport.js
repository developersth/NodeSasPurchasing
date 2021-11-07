const passport = require('passport'),
  passportJWT = require("passport-jwt"),
  ExtractJWT = passportJWT.ExtractJwt,
  JWTStrategy = passportJWT.Strategy,
  LocalStrategy = require('passport-local').Strategy,
  db = require('../models')

// Mock Data
const user = {
  id: 1,
  sub: 'admin_dev',
  username: 'admin_dev',
  password: 'admin_dev',
}

passport.use(new LocalStrategy({
  usernameField: 'username',
  passwordField: 'password'
},
  (username, password, cb) => {

    //this one is typically a DB call.
    if (username !== user.username)
      return cb(null, false, { message: 'Incorrect email or password.' })

    return cb(null, user, { message: 'Logged In Successfully' })
  }
));

passport.use(new JWTStrategy ({ 
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'your_jwt_secret'
},
  (jwtPayload, cb) => {
    //find the user in db if needed. This functionality may be omitted if you store everything you'll need in JWT payload.
    return  db.users.findOne({ username: jwtPayload.username })
      .then(user => {
        return cb(null, user);
      })
      .catch(err => {
        return cb(err);
      });
  }
));
module.exports = passport