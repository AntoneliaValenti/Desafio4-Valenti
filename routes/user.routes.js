const express = require('express')
const { Router } = express
const router = new Router()

//Routes
 router.get('/', (req, res)=> {
  res.render("realTimeProducts", { nombre: 'Antonelia' })
})


module.exports = router