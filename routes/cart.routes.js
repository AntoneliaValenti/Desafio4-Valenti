const express = require('express')
const { Router } = require('express')
const { cartManager } = require('../cartManager.js')

export const cartsRouter = Router()
const CartManager = new cartManager()

cartsRouter.post('/', async (req, res) => {
    try {
        const response = await CartManager.newCart()
        res.json(response)
    } catch (error) {
        res.send('Error al crear el carrito')
    }
})

cartsRouter.get('/:cid', async (req, res) => {
const {cid} = req.params
    try{
        const response = await CartManager.getCartProducts(cid)
        res.json(response)
    } catch {
        res.send("Error al agregar prodcuto al carrito")
    }
})

cartsRouter.post('/:cid/products/:pid', async (req, res) => {
    const {cid, pid} = req.params
    try{
        await CartManager.addProductToCart(cid, pid)
        res.send("Producto agregado")
    } catch {
        res.send("Error al guardar producto al carrito")
    }
})


module.exports = cartsRouter

