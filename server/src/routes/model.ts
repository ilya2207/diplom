import { Router } from 'express'
import fileUpload from 'express-fileupload'
import { expressjwt } from 'express-jwt'
import ModelController from '../handlers/model/model.controller'
import adminMiddleware from '../middlewares/admin.middleware'

const modelRouter = Router()

modelRouter.get('/', ModelController.show)
modelRouter.get('/:modelId', ModelController.show)
modelRouter.get('/search')
modelRouter.use(
  expressjwt({
    secret: process.env.JWT_ACCESS_SECRET,
    algorithms: ['HS256'],
  })
)
modelRouter.use(adminMiddleware)
modelRouter.delete('/:modelId', ModelController.delete)
modelRouter.use(fileUpload())
modelRouter.post('/', ModelController.add)
modelRouter.put('/:modelId', ModelController.edit)

export default modelRouter
