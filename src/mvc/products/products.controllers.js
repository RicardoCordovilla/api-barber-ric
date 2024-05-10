
// model 
// name,description,price   
// const product = await Products.create({

const Products = require("./products.model")

const createProduct = async (req, res) => {
    const product = req.body
    const { name, description, price } = product || {}   // Destructuring    
    if (!name) {
        res.status(400).json({
            message: 'name is required',
            fields: {
                name: 'string',
                description: 'string',
                price: 'float'
            }
        })
    }
    else {
        const newProduct = await Products.create({
            name: name,
            description: description,
            price: price
        })
        res.status(201).json({ newProduct })
    }
}

const getProducts = async (req, res) => {
    const products = await Products.findAll()
    res.status(200).json(products)
}


const updateProduct = async (req, res) => {
    const id = req.params.id
    const product = req.body
    const { name, description, price } = product    // Destructuring    
    if (!name) {
        res.status(400).json({
            message: 'name is required',
            fields: {
                name: 'string'
            }
        })
    }
    else {
        const updatedProduct = await Products.update({
            name: name,
            description: description,
            price: price
        }, {
            where: {
                id: id
            }
        })
        res.status(201).json({ updatedProduct })
    }
}

const deleteProduct = async (req, res) => {
    const id = req.params.id
    const deletedProduct = await Products.destroy({
        where: {
            id: id
        },
        truncate: true
    })
    res.status(200).json({ deletedProduct })
}

module.exports = {
    createProduct,
    getProducts,
    updateProduct,
    deleteProduct
}