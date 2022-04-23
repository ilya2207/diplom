import { UploadedFile } from 'express-fileupload'
import prisma from '../../prisma'

type Folder = 'detail' | 'model'

export default class ImageService {
  static async upload(folder: Folder, file: UploadedFile) {
    const path = `${process.cwd()}/images/${folder}/${Date.now()}${file.name}`
    file.mv(path)
    const newImage = await prisma.image.create({
      data: {
        path,
      },
    })
    return newImage
  }
}
