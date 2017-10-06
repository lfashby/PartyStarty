const mongoose = require('mongoose');

var FoodSchema = new mongoose.Schema({
  eventId: String,
  calories: String,
  dietLabels: [String],
  image: String,
  ingredientLines: [String],
  label: String,
  url: String,
  totalNutrients: [String] 

});

module.exports = mongoose.model('food', FoodSchema);

// calories
// :
// 2253.102010192871
// cautions
// :
// []
// dietLabels
// :
// ["Low-Carb"]
// digest
// :
// (22) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
// healthLabels
// :
// (4) ["Sugar-Conscious", "Peanut-Free", "Tree-Nut-Free", "Alcohol-Free"]
// image
// :
// "https://www.edamam.com/web-img/262/262b4353ca25074178ead2a07cdf7dc1.jpg"
// ingredientLines
// :
// (4) ["1/2 cup (125ml) mirin", "1/2 cup (125ml) soy sauce", "One 2-inch (5cm) piece of fresh ginger, peeled and grated", "2-pounds (900g) boneless chicken thighs (4-8 thighs, depending on size)"]
// ingredients
// :
// (4) [{…}, {…}, {…}, {…}]
// label
// :
// "Teriyaki Chicken"
// shareAs
// :
// "http://www.edamam.com/recipe/teriyaki-chicken-7bf4a371c6884d809682a72808da7dc2/chicken"
// source
// :
// "David Lebovitz"
// totalDaily
// :
// {ENERC_KCAL: {…}, FAT: {…}, FASAT: {…}, CHOCDF: {…}, FIBTG: {…}, …}
// totalNutrients
// :
// {ENERC_KCAL: {…}, FAT: {…}, FASAT: {…}, FATRN: {…}, FAMS: {…}, …}
// totalWeight
// :
// 1179.9110107421875
// uri
// :
// "http://www.edamam.com/ontologies/edamam.owl#recipe_7bf4a371c6884d809682a72808da7dc2"
// url
// :
// "http://www.davidlebovitz.com/2012/12/chicken-teriyaki-recipe-japanese-farm-food/"
// yield
// :
