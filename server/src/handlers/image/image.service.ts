import { Image } from '@prisma/client'
import { UploadedFile } from 'express-fileupload'
import { unlink } from 'fs'
import prisma from '../../prisma'
import { ImageRelativeType } from '../../types/types'

export default class ImageService {
  static async upload(folder: ImageRelativeType, file: UploadedFile) {
    const imgPathtoDb = `/images/${folder}/${Date.now()}${file.name}`
    const path = `${process.cwd()}${imgPathtoDb}`
    file.mv(path)
    const newImage = await prisma.image.create({
      data: {
        path: imgPathtoDb,
      },
    })
    return newImage
  }

  static async findImgId(id: number, type: ImageRelativeType): Promise<Image> {
    let img: Image

    if (type === 'detail') {
      const imageFromDb = await prisma.detail.findUnique({
        where: {
          id,
        },
        select: {
          img: true,
        },
      })
      img = imageFromDb.img
    } else if (type === 'model') {
      const imageFromDb = await prisma.carModel.findUnique({
        where: {
          id,
        },
        select: {
          img: true,
        },
      })
      img = imageFromDb.img
    }
    return img
  }

  static async update(imgId: number, file: UploadedFile) {
    const imgFromDb = await prisma.image.findUnique({
      where: {
        id: imgId,
      },
    })
    const path = `${process.cwd()}${imgFromDb.path}`
    file.mv(path)
    return imgFromDb
  }

  static async delete(imgId: number) {
    const imgFromDb = await prisma.image.findUnique({
      where: {
        id: imgId,
      },
    })

    const path = `${process.cwd()}${imgFromDb.path}`
    unlink(path, (error) => {
      console.error(error)
    })

    await prisma.image.delete({
      where: {
        id: imgId,
      },
    })
  }
}
