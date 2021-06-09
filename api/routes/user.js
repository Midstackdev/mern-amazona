import express from 'express'
import expressAsyncHandler from 'express-async-handler'
import * as controller from '../controllers/user.js'

const router = express.Router()

router.get('/seed', expressAsyncHandler(controller.createUser))

export default router