import data from "../data.js"
import Product from "../models/Product.js"

export const createProducts = async(req, res) => {
    // await Product.remove({})
    const createdProducts = await Product.insertMany(data.products)
    res.send({
        createdProducts
    })
}

export const show = async (req, res) => {
    const product = await Product.findById(req.params.id)
    if(product) {
        res.send(product)
    }else {
        res.status(404).send({ message: 'Product not found'})
    }
}

export const index = async (req, res) => {
    const products = await Product.find({})
    res.send(products)
}