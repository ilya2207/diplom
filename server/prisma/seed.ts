import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'
const prisma = new PrismaClient()

async function main() {
  await createDetail()
}

async function createAdmin() {
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

async function createDetail() {
  await prisma.detail.create({
    data: {
      price: 1300,
      shortDescription: '123',
      title: 'Форсунка',
      models: {
        connect: [{ id: 15 }, { id: 16 }, { id: 2 }],
      },
    },
  })
}

async function createCarModels() {
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

main()
  .then(() => console.log('Seed Success'))
  .catch((e) => {
    console.log(e)
  })
  .finally(() => {
    prisma.$disconnect()
  })
