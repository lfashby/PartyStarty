const recipeid = require('../config.js').recipeapp_id || process.env.recipeapp_id;
const recipekey = require('../config.js').recipeapp_key || process.env.recipeapp_key;
const Food = require('../model/food.js');
const express = require('express');
const axios = require('axios');
const router = express.Router(); 

// router.use((req,res,next) => {
//   console.log('request is ', req);
//   next();
// })

router.post('/', (req, res) => {
  var q = req.body.q;
  console.log('q',q);
  axios({
    method: 'GET',
    url: `https://api.edamam.com/search`,
    params: {
      q: q,
      app_id: recipeid,
      app_key: recipekey
    }
  })
  .then(result => {
    console.log('food result is ', result.data);
    res.send(result.data);
  })
  .catch(err => {
    console.log('err ', err);
    return;
  })
});

router.post('/add', (req, res) => {
  var foods = req.body.foods;
  console.log('adding ',req);
  Food.create(foods, (err, fooditems) => {
    if (err) {
      console.log('error making food ', err);
      return;
    } else {
      console.log('food made is ',fooditems);
      //res.send(fooditems);
    }
  })
})

router.get('/foods/:eventId', (req, res) => {   //get foods using eventId
  var eventId = req.params.eventId;
  console.log(eventId, req);
  Food.find({eventId})
  .exec((err, foods) => {
    if (err) {
      console.log(err);
      return;
    }
    res.send(foods);
  })
})

router.get('/allFoods', (req, res) => { //get all foods
  Food.find({})
  .exec((err, foods) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log(JSON.stringify(foods));
    res.send(foods);
  })
})

module.exports = router;