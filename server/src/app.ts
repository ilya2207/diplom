import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import prisma from './prisma'
import cookieParser from 'cookie-parser'
import router from './routes'
import compression from 'compression'

const app = express()
const port = process.env.PORT || 5000

app.use(express.static(`${process.cwd()}/build`))
app.use('/images', express.static(`${process.cwd()}/images`))

app.use(compression())
app.use(express.json())
app.use(cookieParser())
app.use(cors({ origin: 'http://localhost:3000', credentials: true }))
app.use('/api', router)

app.listen(5000, async () => {
  try {
    console.log(`Server has been stared at port : ${port}`)
    const result = await prisma.category.findUnique({
      where: {
        id: 53,
      },
      include: {
        childCategories: {
          include: {
            details: true,
          },
        },
      },
    })
    console.dir(result.childCategories)
  } catch (error) {
    prisma.$disconnect()
    console.log(error)
  }
})
