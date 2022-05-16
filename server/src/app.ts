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
app.use(
  cors({
    origin: process.env.API_URL || 'http://localhost:3000',
    credentials: true,
  })
)
app.use('/api', router)

app.listen(port, async () => {
  try {
    console.log(`Server has been stared at port : ${port}`)
  } catch (error) {
    prisma.$disconnect()
    console.log(error)
  }
})
