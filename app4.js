const express         = require("express"),
      app             = express(),
      bodyParser      = require("body-parser"),
      mongoose        = require("mongoose"),
      passport        = require("passport"),
      LocalStrategy   = require("passport-local"),
      Campground      = require("./models/campground"),
      methodOverride  = require("method-override"),
      flash           = require("connect-flash"),
      seedDB          = require("./seed"),
      User            = require("./models/user"),
      Comment         = require("./models/comment");
      require('dotenv').config();
  

// Requiring Routes
const commentRoutes   = require("./routes/comments"),
      campgrounRoutes = require("./routes/campground")  ,
      indexRoutes     = require("./routes/index");

const database = process.env.DATABASE_URL.replace("<password>",process.env.DATABASE_PASSWORD);

mongoose.connect(database,{ useUnifiedTopology: true ,useNewUrlParser: true});
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");
app.use(express.static(__dirname + "/public"))
app.use(methodOverride("_method"));
app.use(flash());
//seedDB();

// PASSPORT CONFIGURATION
app.use(require("express-session")({
   secret : "Once Again Rusty Wins!",
   resave : false,
   saveUninitialized : false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req , res , next){
  res.locals.currentUser = req.user;
  res.locals.error     = req.flash("error");
  res.locals.success     = req.flash("success");
  next();
});


// const campgrounds=[
//     {name:"Dehradun",image:"https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60"},
//     {name:"california",image:"https://images.unsplash.com/photo-1532339142463-fd0a8979791a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60"},
//     {name:"dalhousie",image:"https://images.unsplash.com/photo-1508873696983-2dfd5898f08b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60"}
//   ];

  app.use("/campgrounds/:id/comments",commentRoutes);
  app.use(indexRoutes);
  app.use("/campgrounds",campgrounRoutes);

app.listen(3000,function(){
 console.log("yelp Camp has started!!")
});