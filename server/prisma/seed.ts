import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'
const prisma = new PrismaClient()

const createAdmin = async () => {
  const password = await bcrypt.hash('admin', 3)

  await prisma.user.create({
    data: {
      firstname: 'Admin',
      secondname: '',
      lastname: '',
      email: 'admin@mail.ru',
      phone: 'admin',
      type: 'admin',
      password,
    },
  })
}

const createDetail = async () => {
  // await prisma.detail.create({
  //   data: {
  //     price: 1300,
  //     shortDescription: '123',
  //     title: 'Форсунка',
  //     models: {
  //       connect: [{ id: 15 }, { id: 16 }, { id: 2 }],
  //     },
  //   },
  // })
  await prisma.detail.update({
    where: {
      id: 2,
    },
    data: {
      categories: {
        connect: [{ id: 96 }, { id: 97 }],
      },
    },
  })
}

const createCarModels = async () => {
  await prisma.carModel.create({
    data: {
      title: 'Mercedes',
      brandModels: {
        create: [
          { title: 'Кабан', model: 'W13' },
          { title: 'GLE', model: 'S14' },
        ],
      },
    },
  })
}

const main = async () => {
  const res = await prisma.carModel.findMany({
    where: {
      title: 'BMW',
    },
  })

  console.log(res)

  // await createDetail()
}

main()
  .then(() => console.log('Seed Success'))
  .catch((e) => {
    console.log(e)
  })
  .finally(() => {
    prisma.$disconnect()
  })
