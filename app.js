const express = require('express')
const app = express()
const mongoose = require('mongoose')
const userRoutes = require('./routes/user')
const cookingRecipeRoutes = require('./routes/cooking')
const server = app.listen(3001)
const io = require("socket.io")(server, {
    cors: {
      origin: "http://localhost:8080"
    }
})

mongoose.connect('mongodb+srv://laura:nodejslaura@cluster0.b6pps.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', // lie le cluster à l'app
{
    useNewUrlParser: true,
    useUnifiedTopology:true
})
.then(()=> console.log("db valid"))
.catch(error=> console.error(error))

app.use((req,res,next)=> {
    res.setHeader('Access-Control-Allow-Origin','*')
    res.setHeader('Access-Control-Allow-Headers', 'Origin,X-Requested-With,Content,Accept,Content-Type,Authorization')//permet de stocket des choses dans le headers
    res.setHeader('Access-Control-Allow-Methods','GET,POST,PUT,DELETE')// les accès aux méthodes GET, POST, ...
    next()
})

app.use(express.json())
app.use(express.urlencoded({
    extended :true
}))
app.use('/cookingRecipe', cookingRecipeRoutes)
app.use('/user', userRoutes)

io.on('connection', (socket) => {
    console.log(`Connecté au client ${socket.id}`)
    socket.on('disconnect', () => {
      console.log(`Le client ${socket.id} est déconnecté`)
    })
    socket.on('notification', (msg) => {
        console.log('notification: ' + msg)
        io.emit('broadcast', ` ${msg}`)
    })
})

module.exports = app