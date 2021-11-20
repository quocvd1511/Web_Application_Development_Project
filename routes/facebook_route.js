const express= require('express')
const route =  express.Router()
const passport = require("passport")
const FacebookStrategy = require("passport-facebook").Strategy
const { session } = require('passport')
const { Strategy } = require('passport-facebook')
const client_Control = require('../controllers/client_control')
const id_facebook = require('../id_facebook')

passport.serializeUser(function(user, done) {
  done(null, user)
})

passport.deserializeUser(function(user, done) {
  done(null, user)
})

passport.use(
  new FacebookStrategy(
    {
<<<<<<< HEAD
      clientID: "1254302755092908",
      clientSecret: "f93b2f09e77ee4730b89e25a3690dfa4",
=======
      clientID: id_facebook.clientid,
      clientSecret: id_facebook.secretid,
>>>>>>> f77ee7a52ce71a94ed28d6a3cc59e2ea1f4977e2
      callbackURL: "http://localhost:3000/auth/facebook/callback",
    },
    function(accessToken, refreshToken, profile, cb) {
      return cb(null, profile)
    }
  )
)
route.get("/facebook", passport.authenticate("facebook"))
route.get("/facebook/callback",
passport.authenticate("facebook", { failureRedirect: "/" }),client_Control.auth_facebook_callback)

module.exports = route