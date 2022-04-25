import { Router } from 'express'
import fileUpload from 'express-fileupload'
import DetailController from '../handlers/detail/detail.controller'

const detailRouter = Router()

detailRouter.get('/', DetailController.show)
detailRouter.use(fileUpload())
detailRouter.post('/', DetailController.add)
export default detailRouter
