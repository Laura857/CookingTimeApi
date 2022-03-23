const jsonToken = require('jsonwebtoken')

module.exports = (req,res,next)=>{
    try {
        console.log('Authentification en cours')
        let token = req.headers.authorization.split(' ')[1]
        const decodedToken = jsonToken.verify(token,'jesuissecret');
        const userId = decodedToken.userId
        if(req.body.userId && req.body.userId !== userId){
            throw 'Id incorrect.'
        }
        else{
            next();
        }
    } catch{
        res.status(402).json({
            error: new Error('Request non valide.')
        })
    }
}