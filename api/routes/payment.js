import express from 'express'
import expressAsyncHandler from 'express-async-handler'
import * as controller from '../controllers/payment.js'
import { isAuth } from '../middlewares/auth.js'

const router = express.Router()

router.get('/token', isAuth, expressAsyncHandler(controller.generateToken))
router.post('/process', isAuth, expressAsyncHandler(controller.processPayment))

export default router