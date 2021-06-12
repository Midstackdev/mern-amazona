import express from 'express'
import expressAsyncHandler from 'express-async-handler'
import * as controller from '../controllers/order.js'
import { isAuth } from '../middlewares/auth.js'

const router = express.Router()

router.post('/', isAuth, expressAsyncHandler(controller.create))

export default router