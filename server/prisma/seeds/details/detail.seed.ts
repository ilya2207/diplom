import { PrismaClient } from '@prisma/client'
import { readFileSync } from 'fs'
const prisma = new PrismaClient()

interface IDetailS {
  vendorCode: string
  title: string
  img: string
  price: number
}
interface IDetailSeed {
  category_id: number | string
  items: IDetailS[]
}

export const createDetailsByCyArray = async (items: IDetailS[], categoryId: number) => {
  for (const item of items) {
    await prisma.detail.create({
      data: {
        ...item,
        categories: {
          connect: {
            id: categoryId,
          },
        },
      },
    })
  }
}

export const createDetails = async () => {
  console.log(__dirname + '/' + 'details.json')

  const readDetails = readFileSync(__dirname + '/' + 'details-new.json')
  //@ts-expect-error
  const parsedData = JSON.parse(readDetails)
  // await Promise.all(
  //   Object.values(parsedData).map((item: IDetailSeed) => {
  //     return createDetailsByCyArray(item.items, +item.category_id)
  //   })
  // )

  const items: IDetailSeed[] = Object.values(parsedData)
  for (const item of items) {
    await createDetailsByCyArray(item.items, +item.category_id)
  }
  // Object.values(parsedData).forEach(async (item: IDetailSeed) => {
  //   console.log(item)
  //   await Promise.all(
  //     item.items.map((element) => {
  //       return prisma.detail.create({
  //         data: {
  //           ...element,
  //           categories: {
  //             connect: {
  //               id: +item.category_id,
  //             },
  //           },
  //         },
  //       })
  //     })
  //   )
  // })
}
