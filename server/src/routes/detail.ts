import { Router } from 'express'
import fileUpload from 'express-fileupload'
import DetailController from '../handlers/detail/detail.controller'

const detailRouter = Router()

detailRouter.get('/', DetailController.show)
detailRouter.use(fileUpload())
detailRouter.post('/', DetailController.add)
detailRouter.put('/:detailId', DetailController.edit)
detailRouter.delete('/:detailId', DetailController.delete)
export default detailRouter
