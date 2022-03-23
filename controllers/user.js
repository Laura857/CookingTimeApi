const bcrypt = require('bcryptjs')
const User = require('./../models/user')
const jsontoken = require('jsonwebtoken')

exports.signup = (req,res,next) =>{
    console.log('Inscription en cours')
    if (req.body.password.length < 6 ) {
        return res.status(400).json({
            error: {
                errors: {
                    password: {
                        message: "6 caractères minimum attendus."
                    }
                }
            }
        })
    }
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            console.log('Création de l\'utilisateur')
            const user = new User({
                email: req.body.email,
                password: hash,
                pseudo: req.body.pseudo
            })  
            user.save()
                .then(()=> res.status(201).json({message: 'Inscription faite.'}))
                .catch(error=> res.status(400).json({error}))
        })
        .catch(error=> res.status(500).json({error}))
}

exports.login = (req,res,next) => {
    console.log('Connexion en cours')
    User.findOne({email: req.body.email})
        .then(user=>{
            if(!user){
                return res.status(401).json({error: 'Mail incorrect'})
            }
            bcrypt.compare(req.body.password, user.password)
                .then(ok =>{
                    if(!ok){
                        return res.status((401).json({error: 'Mot de passe incorrect'}))
                    }
                    res.status(200).json({
                        userId: user._id,
                        token: jsontoken.sign(
                            {userId: user._id},'jesuissecret', { expiresIn:'48h'}
                        ),
                        pseudo: user.pseudo,
                        email: user.email
                    })
                })
                .catch(error=> res.status(500).json({error: 'Mot de passe incorrect'}))
        })
}

exports.getUserId = (req,res,next)=>{
    console.log('Recherche d\'un utilisateur')
    User.findOne({_id:req.params.id})
        .then(user=> res.status(200).json(user))
        .catch(error => res.status(404).json({error}))
}

exports.updateUserId =(req,res,next)=>{
    console.log('Modification d\'un utilisateur')
    if(req.body.password) {
        if (req.body.password.length < 6 ) {
            return res.status(400).json({
                error: {
                    errors: {
                        password: {
                            message: "6 caractères minimum attendus."
                        }
                    }
                    }
            })
        }
        bcrypt.hash(req.body.password, 10)
        .then(hash => {
            req.body.password = hash
            User.updateOne({_id: req.params.id},{ $set: {...req.body, _id: req.params.id}})
                .then(()=> res.status(200).json({message: 'Utilisateur mis à jour'}))
                .catch( error => res.status(400).json({ error}))
        })
        .catch(error=> res.status(500).json({error}))
    } else {
        User.updateOne({_id: req.params.id},{ $set: {...req.body, _id: req.params.id}})
        .then(()=> res.status(200).json({message: 'Utilisateur mis à jour'}))
        .catch(error => res.status(400).json({ error}))
    }
}
