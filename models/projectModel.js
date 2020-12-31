const mongoose =require('mongoose');



const projectSchima = new mongoose.Schema({
  product_id:{
    type:String,
    unique:true,
    trim:true,
 
},
title:{
 type:String,
 trim:true,

},

description:{
     type:String,
     required:true
 },

 images:{
     type:Object,
     required:true
 },

})

module.exports=mongoose.model("projects", projectSchima)