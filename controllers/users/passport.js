const GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require("passport");
const User = require("../../models/user/User");

//==============
//GOOGLE AUTH
//==============
passport.use(
  new GoogleStrategy(
    {
      clientID:
        "408401850346-16eidpftjjqfk57md8ocfv0ieg7800d3.apps.googleusercontent.com",
      clientSecret: "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",
      callbackURL: "/api/users/google/callback",
      profileFields: ["emails", "displayName"],
    },
    async (accessToken, refreshToken, profile, done) => {
      const newUser = {
        googleId: profile.id,
        displayName: profile.displayName,
        firstName: profile.name.givenName,
        lastName: profile.name.familyName,
        email: profile.emails[0].value,
        profilePhoto: profile.photos[0].value,
      };

      try {
        let user = await User.findOne({ googleId: profile.id });

        if (user) {
          done(null, user);
        } else {
          user = await User.create(newUser);
          done(null, user);
        }
      } catch (err) {
        console.error(err);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});
passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => done(err, user));
});
