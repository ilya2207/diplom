import { Router } from 'express'
import fileUpload from 'express-fileupload'
import ModelController from '../handlers/model/model.controller'

const modelRouter = Router()

modelRouter.use(fileUpload())
modelRouter.get('/', ModelController.show)
modelRouter.get('/:modelId', ModelController.show)
modelRouter.post('/', ModelController.add)
modelRouter.put('/:modelId', ModelController.edit)

export default modelRouter
