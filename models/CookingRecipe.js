const mongoose = require('mongoose')

const cookingRecipeSchema = mongoose.Schema({
    name: {type: String, required:true},
    ingredients:{type: String, required:true},
    instruction:{type: String, required:true},
    urlImage:{type: String, required:false}
})

module.exports = mongoose.model('CookingRecipe', cookingRecipeSchema)