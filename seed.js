const mongoose=require("mongoose");
const Campground=require("./models/campground");
const Comment=require("./models/comment");

const data=[
    {
       name:"Clouds Rest",
       image:"https://images.unsplash.com/photo-1529528744093-6f8abeee511d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60",
       description:"Beautiful clouds spreading everywhee the whole sky looks cloudy"
    },
    {
        name:"Water Clouds",
        image:"https://images.unsplash.com/photo-1484199316358-d7acb93729f2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60",
        description:"Beautiful clouds spreading everywhee the whole sky looks cloudy"
     },
     {
        name:"Blue clouds",
        image:"https://images.unsplash.com/photo-1529832393073-e362750f78b3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60",
        description:"Beautiful clouds spreading everywhee the whole sky looks cloudy"
     }
]

function seedDB(){

    //Remove all campgrounds
    Campground.remove({},function(err){
        if(err){
            console.log(err);
        }
      console.log("remove campgrounds!");
       //Add A few Campgrounds
    data.forEach(function(seed){
        Campground.create(seed,function(err,campground){
           if(err){
               console.log(err);
           }else{
               console.log("Added a Campground");
               //create a comment
               Comment.create({
                   text:"this place is great",
                   author:"Shehreen"
               },function(err,comment){
                   if(err){
                       console.log(err);
                   }else {
                    campground.comments.push(comment);
                    campground.save();
                    console.log("NEw comment created"); 
                   }
                
               });
           }
        });
    });
    });   
}
module.exports=seedDB;

