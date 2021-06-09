import express from 'express'
import { connectToDB } from './config/db.js'

import data from './data.js'
import { registerRoutes } from './routes/index.js'

const app = express()
const PORT = process.env.PORT || 5001

connectToDB()
registerRoutes(app)
app.get('/', (req, res) => {
    res.send('Server is ready')
})

app.get('/api/products/:id', (req, res) => {
    const product = data.products.find(x => x._id === req.params.id)
    if(product) {
        res.send(product)
    }else {
        res.status(404).send({ message: 'Product not found'})
    }
})

app.get('/api/products', (req, res) => {
    res.send(data.products)
})

app.use((err, req, res, next) => {
    res.status(500).send({ message: err.message })
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})