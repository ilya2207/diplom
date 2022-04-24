import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'
const prisma = new PrismaClient()

async function main() {
  await prisma.carModel.create({
    data: {
      title: 'HEllo world',
      brandId: 2,
    },
  })
}

async function createAdmin() {
  const password = await bcrypt.hash('admin', 3)

  await prisma.user.create({
    data: {
      firstname: 'admin',
      secondname: 'admin',
      lastname: 'admin',
      email: 'admin@mail.ru',
      phone: 'admin',
      type: 'Admin',
      password,
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
