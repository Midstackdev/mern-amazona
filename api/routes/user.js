import express from 'express'
import expressAsyncHandler from 'express-async-handler'
import * as controller from '../controllers/user.js'
import { isAuth } from '../middlewares/auth.js'

const router = express.Router()

router.get('/seed', expressAsyncHandler(controller.createUsers))
router.post('/signin', expressAsyncHandler(controller.login))
router.post('/signup', expressAsyncHandler(controller.register))
router.get('/:id', isAuth, expressAsyncHandler(controller.show))
router.put('/:id', isAuth, expressAsyncHandler(controller.update))

export default router