const express = require('express')
const router = express.Router()
const cookingController = require('./../controllers/cooking')
const auth = require('../middleware/auth')

router.post('/',  auth, cookingController.createCookingRecipe)
router.put('/:id',  auth, cookingController.updateCookingRecipeId)
router.post('/search', cookingController.getCookingRecipeLikeName)
router.delete('/:id', auth, cookingController.deleteCookingRecipeId)
router.get('/:id', cookingController.getCookingRecipeId)
router.get('/', cookingController.getAllCookingRecipe)

module.exports = router