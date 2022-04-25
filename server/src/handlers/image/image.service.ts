import { UploadedFile } from 'express-fileupload'
import { unlink } from 'fs'
import { ImageRelativeType } from '../../types/types'

export default class ImageService {
  static async upload(folder: ImageRelativeType, file: UploadedFile) {
    const imgPathtoDb = `/images/${folder}/${Date.now()}${file.name}`
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

  static async update(pathfromDb: string, file: UploadedFile) {
    const path = `${process.cwd()}${pathfromDb}`
    file.mv(path)
    return path
  }

  static async delete(pathfromDb) {
    const path = `${process.cwd()}${pathfromDb}`
    unlink(path, (error) => {
      console.error(error)
    })
  }
}
