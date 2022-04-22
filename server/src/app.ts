import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import userRouter from './routes/user/index'
import prisma from './prisma'
import cookieParser from 'cookie-parser'

const app = express()
const port = process.env.PORT || 5000
app.use(express.json())
app.use(cookieParser())
app.use(cors())
app.use('/api/user', userRouter)

app.listen(5000, async () => {
  try {
    console.log(`Server has been stared at port : ${port}`)
  } catch (error) {
    prisma.$disconnect()
    console.log(error)
  }
})
