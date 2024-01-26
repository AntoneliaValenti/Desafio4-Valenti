const express = require('express')
const cartsRouter = require('./cartManager')
const prodRouter  = require('./ProductManager')
const routerUsers  = require('./routes/user.routes')
const handlebars = require('express-handlebars')
const http = require('http')
const { Server } = require('socket.io')
const app = express()

let arrMessage = []

//server
const PORT = 8080 || process.env.PORT
const server = http.createServer(app)

//public
app.use(express.static(__dirname+'/public'))

//motor plantilla
app.engine('handlebars', handlebars.engine())  //inicializar
app.set('views', __dirname+'/views')  // 
app.set('view engine', 'handlebars')  

//routes

app.use('/', routerUsers)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/products', prodRouter)
app.use('/api/carts', cartsRouter)


//socket 19.49
const io = new Server(server)
 io.on('connection', (socket)=>{
    console.log('Hola nuevo Cliente')
    socket.emit('welcome', 'Bienvenido Cliente nuevo')

    socket.on('new-message', (data)=> {
        arrMessage.push(data)
        socket.emit('message-all', arrMessage)
    })
    
    // socket.on('reqDelProd', (data)=> {
    //     delProd(data)
    // })
})
//script en hom.hand

// const delProd = async (id) => {
//     try {
//       const prodDel = await pm.deleteProduct(id);
//       return prodDel ? true : false;
//     } catch (er) {
//       console.error(er);
//       return false;
//     }
// }

server.listen(PORT, ()=> {
    console.log(`server run on port ${PORT}`)
})
