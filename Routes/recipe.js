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

module.exports = router;