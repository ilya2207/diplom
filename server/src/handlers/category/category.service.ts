import prisma from '../../prisma'
import { ICategory } from './category.types'

export default class CategoryService {
  static async show() {
    const categories = await prisma.category.findMany({
      where: {
        parentCategoryId: null,
      },
      select: {
        id: true,
        title: true,
        childCategories: {
          select: {
            id: true,
            title: true,
          },
          orderBy: {
            id: 'asc',
          },
        },
      },
      orderBy: {
        id: 'asc',
      },
    })
    return categories
  }

  static async add(category: ICategory) {
    const newCategory = await prisma.category.create({
      data: category,
    })

    return newCategory
  }

  static async edit(id: number, category: ICategory) {
    const newCategory = await prisma.category.update({
      where: {
        id,
      },
      data: category,
    })

    return newCategory
  }

  static async delete(id: number) {
    const deletedCategory = await prisma.category.delete({
      where: {
        id,
      },
    })

    return deletedCategory
  }

  static async search(searchStr: string) {
    const items = await prisma.category.findMany({
      where: {
        AND: [{ NOT: { parentCategory: null } }, { title: { contains: searchStr } }],
      },
    })
    return items
  }
}
