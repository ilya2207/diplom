import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import prisma from './prisma'
import cookieParser from 'cookie-parser'
import router from './routes'

const app = express()
const port = process.env.PORT || 5000

app.use('/images', express.static(`${process.cwd()}/images`))
app.use(express.json())
app.use(cookieParser())
app.use(cors({ origin: 'http://localhost:3000', credentials: true }))
app.use('/api', router)
app.listen(5000, async () => {
  try {
    console.log(`Server has been stared at port : ${port}`)
  } catch (error) {
    prisma.$disconnect()
    console.log(error)
  }
})
