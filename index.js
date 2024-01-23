const express = require('express')
const app = express()

//Routes
app.get('/home', (req, res) =>{
 res.send('Hola, ')
})

app.listen(8080, () => {
 console.log ("server ok!")
})