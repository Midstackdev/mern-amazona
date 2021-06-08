import express from 'express'

import data from './data.js'

const app = express()
const PORT = process.env.PORT || 5001

app.get('/', (req, res) => {
    res.send('Server is ready')
})

app.get('/api/products', (req, res) => {
    res.send(data.products)
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})