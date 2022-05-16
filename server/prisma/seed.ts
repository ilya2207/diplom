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
      basket: {
        create: {},
      },
    },
  })
}

const createDetail = async () => {
  for (let i = 1; i <= 100; i++) {
    await prisma.detail.create({
      data: {
        price: i * 1000,
        shortDescription: `Номер ${i * 20}`,
        title: `Поршень ${i}`,
        categories: {
          connect: [{ id: 2 }],
        },
      },
    })
  }
  for (let i = 1; i <= 100; i++) {
    await prisma.detail.create({
      data: {
        price: i * 1000,
        shortDescription: `Номер ${i * 20}`,
        title: `Браслет ${i}`,
        categories: {
          connect: [{ id: 3 }],
        },
      },
    })
  }
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
  // await createAdmin()
  await createDetail()
}

main()
  .then(() => console.log('Seed Success'))
  .catch((e) => {
    console.log(e)
  })
  .finally(() => {
    prisma.$disconnect()
  })
