import express from 'express'
import { connectToDB } from './config/db.js'
import { registerRoutes } from './routes/index.js'

const app = express()
const PORT = process.env.PORT || 5001

connectToDB()
registerRoutes(app)

app.get('/', (req, res) => {
    res.send('Server is ready')
})


app.use((err, req, res, next) => {
    res.status(500).send({ message: err.message })
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})