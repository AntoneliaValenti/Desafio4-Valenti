const fs = require('fs').promises

class ProductManager {
    constructor() {
        this.products = []
        this.id = 0
        this.path = './prod.json'
    }

    async allProducts() {
        try {
            let res = await fs.readFile(this.path, 'utf-8')
            return JSON.parse(res)
        } catch (err) {
            console.error(`Hubo un error al leer el archivo: ${err}`)
            throw err
        }
    }

    async addProduct(title, description, price, thumbnail, code, stock) {
        try {
            const data = await fs.readFile(this.path, 'utf-8')
            this.products = JSON.parse(data)

            if (this.products.some(prod => prod.code === code)) {
                console.log(`Ya existe un producto con el código ${code}`)
                return;
            }

            let newProduct = { id: this.id++, title, description, price, thumbnail, code, stock }
            this.products.push(newProduct)

            await fs.writeFile(this.path, JSON.stringify(this.products, null, 2), 'utf-8')
            console.log("Producto agregado correctamente")
        } catch (err) {
            console.error(`Existe un error: ${err}`)
            throw err
        }
    }

    async getProductById(id) {
        try {
            this.products = await this.allProducts()
            let element = this.products.find((e) => e.id === id)
            if (element) {
                return element
            } else {
                console.log(`No existe ningún producto con el ID ${id}`);
                return null
            }
        } catch (err) {
            console.error(`Hubo un error: ${err}`)
            throw err
        }
    }
}

module.exports = ProductManager