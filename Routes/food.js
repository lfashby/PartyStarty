const recipeid = require('../config.js').recipeapp_id || process.env.recipeapp_id;
const recipekey = require('../config.js').recipeapp_key || process.env.recipeapp_key;
const express = require('express');
const axios = require('axios');
const router = express.Router(); 

router.post('/recipes', (req, res) => {
  var q = req.body.q;
  axios.get({
    method: 'GET',
    url: `https://api.edamam.com/search`,
    params: {
      q: q,
      app_id: recipeid,
      app_key: recipekey
    }
  })
  .then(result => {
    console.log('food result is ', result);
    res.send(result.data);
  })
});

module.exports = router;