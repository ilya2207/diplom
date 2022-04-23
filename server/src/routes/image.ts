import { Router } from 'express'
import fileUpload from 'express-fileupload'

const imageRouter = Router()

imageRouter.use(fileUpload())
imageRouter.post('/upload', async function (req, res, next) {
  try {
    console.log(req.files.img)
    console.log(req.body)
    console.log(Date.now())
    // @ts-ignore
    await req.files.img.mv(
      // @ts-ignore
      `${process.cwd()}/images/${Date.now() + req.files.img.name}`,
      function (err) {
        if (err) {
          next(err)
        }
      }
    )
  } catch (error) {
    next(error)
  }
})

export default imageRouter
