import express, { Request, Response } from 'express'

const app = express()

const port = 5000

app.listen(5000, () => {
  console.log(`Server has been stared at port : ${port}`)
})
