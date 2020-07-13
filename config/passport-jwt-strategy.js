
// require passport for implementing JWT
const passport = require('passport');

// require JWT strategy for jwt auth
const JWTStrategy = require('passport-jwt').Strategy;

// Extractor for the JWT token
const ExtractJWT = require('passport-jwt').ExtractJwt;

// require User Doctor schema model for apply JWT auth
const UserDoctor = require('../models/user_doctor');


// Giving JWT a secret key against which it encode the JWT token 
let opts = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'hospital_API'
}


// Using the JWt Strategy
passport.use(new JWTStrategy(opts, function(jwtPayLoad, done){

    // finding doctor with payload 
    UserDoctor.findById(jwtPayLoad._id, function(err, user){
        if (err){console.log('Error in finding user from JWT'); return;}

        // if user found, return true
        if (user){
            return done(null, user);
        }else{
        // if user not found, return false
            return done(null, false);
        }
    })

}));

// exporting the passport
module.exports = passport;
