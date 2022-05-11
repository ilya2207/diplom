import { UploadedFile } from 'express-fileupload'
import { unlink } from 'fs'
import ApiError from '../../exceptions/api-error'
import { ImageRelativeType } from '../../types/types'

export default class ImageService {
  static generatePathToDb(fileName: string, folder: ImageRelativeType) {
    return `/images/${folder}/${Date.now()}${fileName}`
  }
  static async upload(folder: ImageRelativeType, file: UploadedFile) {
    const imgPathtoDb = this.generatePathToDb(file.name, folder)
    const path = `${process.cwd()}${imgPathtoDb}`
    file.mv(path)
    return imgPathtoDb
  }

  // static async findImgId(id: number, type: ImageRelativeType): Promise<Image> {
  //   let img: Image

  //   if (type === 'detail') {
  //     const imageFromDb = await prisma.detail.findUnique({
  //       where: {
  //         id,
  //       },
  //       select: {
  //         img: true,
  //       },
  //     })
  //     img = imageFromDb.img
  //   } else if (type === 'model') {
  //     const imageFromDb = await prisma.carModel.findUnique({
  //       where: {
  //         id,
  //       },
  //       select: {
  //         img: true,
  //       },
  //     })
  //     img = imageFromDb.img
  //   }
  //   return img
  // }

  static async update(folder: ImageRelativeType, file: UploadedFile, oldFilePath: string) {
    const pathToDb = this.generatePathToDb(file.name, folder)
    const path = `${process.cwd()}${pathToDb}`
    file.mv(path)
    if (
      oldFilePath !== process.env.MODEL_DEFAULT_IMAGE &&
      oldFilePath !== process.env.DETAIL_DEFAULT_IMAGE
    ) {
      unlink(`${process.cwd()}${oldFilePath}`, (err) => {
        if (err) ApiError.someError()
      })
    }
    return pathToDb
  }

  static async delete(pathfromDb: string) {
    const path = `${process.cwd()}${pathfromDb}`
    unlink(path, (error) => {
      console.error(error)
    })
  }
}
