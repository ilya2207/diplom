import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  await prisma.carModels.create({
    data: {
      title: 'M5',
      model: 'F90',
      brandId: 1,
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
