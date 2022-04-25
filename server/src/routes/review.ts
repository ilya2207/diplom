import { Router } from 'express'

const reviewRouter = Router()

reviewRouter.get('/:detailId')
reviewRouter.post('/:detailId')
reviewRouter.put('/:reviewId')
reviewRouter.delete('/:reviewId')

export default reviewRouter
