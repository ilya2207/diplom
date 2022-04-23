import 'dotenv/config'
import { Router } from 'express'
import { expressjwt } from 'express-jwt'
import CategoryController from '../handlers/category/category.controller'
import adminMiddleware from '../middlewares/admin.middleware'

const categoryRouter = Router()

categoryRouter.get('/', CategoryController.show)
categoryRouter.use(
  expressjwt({
    secret: process.env.JWT_ACCESS_SECRET,
    algorithms: ['HS256'],
  })
)
categoryRouter.use(adminMiddleware)
categoryRouter.post('/', CategoryController.add)
categoryRouter.put('/:categoryId', CategoryController.edit)
categoryRouter.delete('/:categoryId', CategoryController.delete)

export default categoryRouter
