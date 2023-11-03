import { FastifyRequest, FastifyReply } from 'fastify'

import ReviewService, { Review } from 'services/ReviewService'
const reviewService = new ReviewService()

type ReviewRequest = FastifyRequest<{
    Querystring: { search: string }
    Params: { id: string }
    Body: Review
}>

export default class ReviewController {
    async getReviews(request: ReviewRequest, reply: FastifyReply) {
        try {
            const reviews = await reviewService.get(request.query.search)
            return reviews
        } catch(err) {
            return reply.status(500).send(err)
        }
    }

    async getReviewById(request: ReviewRequest, reply: FastifyReply) {
        const reviewId = request.params.id

        try {
            const review = await reviewService.getById(reviewId)
            return review
        } catch(err) {
            return reply.status(500).send(err)
        }
    }

    async createReview(request: ReviewRequest, reply: FastifyReply) {
        try {
            const review = await reviewService.create(request.body)
            return reply.status(201).send(review)
        } catch(err) {
            return reply.status(500).send(err)
        }
    }

    async updateReview(request: ReviewRequest, reply: FastifyReply) {
        const reviewId = request.params.id
    
        try {
            const review = await reviewService.update(reviewId, request.body)
            return reply.status(200).send(review)
        } catch(err) {
            return reply.status(500).send(err)
        }
    }

    async deleteReview(request: ReviewRequest, reply: FastifyReply) {
        const reviewId = request.params.id
    
        try {
            await reviewService.delete(reviewId)
            return reply.status(204).send()
        } catch(err) {
            return reply.status(500).send(err)
        }
    }
}