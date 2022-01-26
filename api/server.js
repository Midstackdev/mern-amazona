import express from 'express'
import cors from 'cors'
import path from 'path'
import { fileURLToPath } from 'url';
import dotenv from 'dotenv'

dotenv.config()

import { connectToDB } from './config/db.js'
import { registerRoutes } from './routes/index.js'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express()
const PORT = process.env.PORT || 5001

connectToDB()

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors())
app.use(express.static(path.join(__dirname, '../client/build')));

registerRoutes(app)

// app.get('/', (req, res) => {
//     res.send('Server is ready')
// })

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

app.use((err, req, res, next) => {
    res.status(500).send({ message: err.message })
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})