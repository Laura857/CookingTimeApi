const CookingRecipe = require('../models/CookingRecipe')

exports.createCookingRecipe = (req,res,next)=>{
    console.log("Sauvegarde d\'une nouvelle recette")
    const cookingRecipeDate = req.body
    delete cookingRecipeDate._id;
    const newCookingRecipe = new CookingRecipe({
        ...cookingRecipeDate
    })
    newCookingRecipe.save()
        .then(() => res.status(201).json({message : 'Nouvelle recette enregistrée !'}))
        .catch(error => res.status(400).json({ error}))
}

exports.updateCookingRecipeId =(req,res,next)=>{
    console.log("Mise à jour d\'une recette")
    CookingRecipe.updateOne({_id: req.params.id},{...req.body, _id: req.params.id})
        .then(()=> res.status(200).json({message: 'La recette a été mise à jour.'}))
        .catch(()=> res.status(400).json({ error}))
}

exports.deleteCookingRecipeId =(req,res,next)=>{
    console.log("Suppression d\'une recette")
    CookingRecipe.findOne({_id:req.param.id})
        .then(CookingRecipe.deleteOne({_id: req.params.id})
                .then(()=> res.status(200).json({message: 'Le recette a été supprimée.'}))
                .catch(error => res.status(400).json({error}))
        )
        .catch(error => res.status(500).json({error}))  
}

exports.getCookingRecipeId = (req,res,next)=>{
    console.log("Recherche d\'une recette")
    CookingRecipe.findOne({_id:req.params.id})
        .then(cookingRecipe=> res.status(200).json(cookingRecipe))
        .catch(error => res.status(404).json({error}))
}

exports.getAllCookingRecipe = (req,res,next)=> {
    console.log("Recherche de toutes les recettes")
    CookingRecipe.find()
        .then(cookingRecipe => res.status(200).json(cookingRecipe))
        .catch(error=> res.status(400).json({error}))
}

exports.getCookingRecipeLikeName = (req,res,next)=> {
    console.log("Recherche de type LIKE des recettes avec ", req.body.name)
    CookingRecipe.find({ name: { '$regex' : req.body.name, '$options' : 'i' }})
        .then(cookingRecipe => res.status(200).json(cookingRecipe))
        .catch(error=> res.status(400).json({error}))
}