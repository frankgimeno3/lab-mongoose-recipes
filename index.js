const mongoose = require('mongoose');
const express = require("express");
const app = express();

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://127.0.0.1:27017/recipe-app';

const pantumaka = {
  "title": "Pantumaka",
  "level": "Easy Peasy",
  "ingredients": [
    "One slice of pà de vidre very torradet",
    "1 spoon of olive oil",
    "1/3 spoon of salt",
    "1 natural tomato",
  ],
  "cuisine": "casolana",
  "dishType": "snack",
  "image": "https://images.media-allrecipes.com/userphotos/720x405/815964.jpg",
  "duration": 2,
  "creator": "Jordi Pujol"
}

// Connection to the database "recipe-app"
mongoose
.set("strictQuery", false)
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany();
  })
  .then(() => {
    return Recipe.create(pantumaka)
  })
  .then(() => {
    // Recipe.create(panconpan)
    return Recipe.insertMany(data)
  })
  .then(()=>{
    return Recipe.findOneAndUpdate({title: "Rigatoni alla Genovese"}, {duration: 100}, {new: true})
  })
  .then(()=>{
    console.log("la 4 está hecha")
  })
  .then(()=>{
    return Recipe.deleteOne({title: "Carrot Cake"})
  })
  .then(()=>{
    console.log("me he cargado el carrot cake")
  })
  .then(()=>{
    mongoose.disconnect();
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });




