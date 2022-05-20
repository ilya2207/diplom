import { Router } from 'express'
import fileUpload from 'express-fileupload'
import { expressjwt } from 'express-jwt'
import DetailController from '../handlers/detail/detail.controller'
import adminMiddleware from '../middlewares/admin.middleware'

const detailRouter = Router()

detailRouter.get('/', DetailController.show)
detailRouter.get('/search', DetailController.search)
detailRouter.use(
  expressjwt({
    secret: process.env.JWT_ACCESS_SECRET,
    algorithms: ['HS256'],
  })
)
detailRouter.use(fileUpload())
detailRouter.use(adminMiddleware)
detailRouter.post('/', DetailController.add)
detailRouter.put('/:detailId', DetailController.edit)
detailRouter.delete('/:detailId', DetailController.delete)
export default detailRouter
