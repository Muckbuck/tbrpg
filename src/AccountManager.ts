const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./models/user');

class AccountManager{

    public setLocalStrategy(){
      passport.use(new LocalStrategy(
        function(username: string, password: string, done: any) {
          User.findOne({ username: username }, function(err, user) {
            if (err) { return done(err); }
            if (!user) {
              return done(null, false, { message: 'Incorrect username.' });
            }
            if (!user.validPassword(password)) {
              return done(null, false, { message: 'Incorrect password.' });
            }
            return done(null, user);
          });
        }
      ));
    }
}
