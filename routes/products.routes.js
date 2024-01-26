const express = require('express')
const { ProductManager } = require('./productManager.js')


// prodRouter.get('/productos', (req, res)) => {
//     res.render("productos")
// }

prodRouter.get('/', async (req, res) => {
    const { limit } = req.query
    const prods = await ProductManager.allProducts()
    const products = prods.slice(0, limit)
    res.status(200).send(products)
})

prodRouter.get('/:id', async (req, res) =>{
    const {id} = req.params
    const prod = await ProductManager.getProductById(id)

    if(prod) {
        res.status(200).send(prod)
    } else {
        res.status(404).send("Producto no encontrado")
    }
}) 

prodRouter.post('/', async (req, res) => {
    const conf = await ProductManager.addProduct(req.body)

    if(conf) {
        res.status(201).send("Producto creado")
    } else {
        res.status(404).send("Producto ya existente")
    }
})

prodRouter.put('/:id', async(req, res ) => {
    const {id} = req.params
    const conf = await ProductManager.updateProduct(id, req.body)

    if(conf) {
        res.status(201).send("Producto actualizado")
    } else {
        res.status(404).send("Producto no encontrado")
    }
})

prodRouter.delete('/:id', async(req, res) => {
    const {id} = req.params
    const conf = await ProductManager.delete(id)

    if(conf) {
        res.status(201).send("Producto eliminado")
    } else {
        res.status(404).send("Producto no encontrado")
    }
})

module.exports = prodRouter