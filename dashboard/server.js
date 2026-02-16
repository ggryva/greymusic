
const express = require("express");
const session = require("express-session");
const passport = require("passport");
const DiscordStrategy = require("passport-discord").Strategy;
const config = require("../config");

const app = express();
app.set("view engine","ejs");

passport.use(new DiscordStrategy({
  clientID: config.clientId,
  clientSecret: config.clientSecret,
  callbackURL: config.callbackURL,
  scope: ["identify","guilds"]
}, (accessToken, refreshToken, profile, done) => done(null, profile)));

passport.serializeUser((u,d)=>d(null,u));
passport.deserializeUser((o,d)=>d(null,o));

app.use(session({ secret: "jockie", resave:false, saveUninitialized:false }));
app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req,res)=>res.send("Dashboard alive"));
app.get("/login", passport.authenticate("discord"));
app.get("/callback", passport.authenticate("discord",{failureRedirect:"/"}),(req,res)=>res.redirect("/"));

app.listen(process.env.PORT || 3000);
