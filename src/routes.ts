import { FastifyInstance, FastifyPluginOptions } from 'fastify'

import ReviewController from 'controllers/ReviewController'
const reviewController = new ReviewController()

export const routes = async (app: FastifyInstance, options: FastifyPluginOptions) => {
    app.get('/review', reviewController.getReviews)
    app.get('/review/:id', reviewController.getReviewById)
    app.post('/review', reviewController.createReview)
    app.put('/review/:id', reviewController.updateReview)
    app.delete('/review/:id', reviewController.deleteReview)
}