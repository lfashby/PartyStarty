const recipeid = require('../config.js').recipeapp_id || process.env.recipeapp_id;
const recipekey = require('../config.js').recipeapp_key || process.env.recipeapp_key;
const express = require('express');
const router = express().Router();