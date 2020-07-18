const express = require("express");
const router  = express.Router();
const passport = require("passport");
const User    = require("../models/user");

// Root route
router.get("/",function(req,res){
    res.render("landing");
});

// show register form
router.get("/register",function(req , res ){
   res.render("register");
});

// handling signUp logic
router.post("/register",function(req , res){
   const newUser = new User({username : req.body.username});
   User.register(newUser,req.body.password,function(err,user){
     if(err){
       req.flash("error",err.message);
       return res.render("register");
     }
     passport.authenticate("local")(req , res , function(){
       req.flash("success","Welcom to YelpCamp " + user.username);
      res.redirect("/campgrounds");
     });
   });
});

// login form
router.get("/login",function(req , res ){
 // req.flash("error" , "Please login first!!!");
  res.render("login");
});

// handling login logic
router.post("/login",passport.authenticate("local" ,
 {
    successRedirect : "/campgrounds",
    failureRedirect : "/login"
  }),function(req , res){
});

// logout route
router.get("/logout",function(req , res ){
 req.logOut();
 req.flash("success" , "Logged you out!");
 res.redirect("/campgrounds");
});

module.exports = router;