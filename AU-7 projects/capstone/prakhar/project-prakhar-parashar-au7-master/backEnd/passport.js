import passportJwt from 'passport-jwt'
import User from './Models/User.js'
import passport from 'passport'

const Strategy = passportJwt.Strategy;
const ExtractJwt = passportJwt.ExtractJwt;

var opts = {}

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'secret';

passport.use(new Strategy(opts, function(jwt_payload, done) {
    User.findOne({_id: jwt_payload._id}, function(err, user) {
        if (err) {
            return done(err, false);
        }
        if (user) {
            console.log(user, "passport")
            return done(null, user);
        } else {
            return done(null, false);
            // or you could create a new account
        }
    });
}));