import { PrismaClient } from '@prisma/client'
//     {
// emit: 'stdout',
// level: 'query',
// },
const prisma = new PrismaClient({
  log: [
    {
      emit: 'stdout',
      level: 'error',
    },
    {
      emit: 'stdout',
      level: 'info',
    },
    {
      emit: 'stdout',
      level: 'warn',
    },
  ],
})

export default prisma
