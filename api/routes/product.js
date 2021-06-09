import express from 'express'
import expressAsyncHandler from 'express-async-handler'
import * as controller from '../controllers/product.js'

const router = express.Router()

router.get('/', expressAsyncHandler(controller.index))
router.get('/seed', expressAsyncHandler(controller.createProducts))
router.get('/:id', expressAsyncHandler(controller.show))

export default router