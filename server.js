import { fastify } from 'fastify'

const server = fastify()
const port = process.env.PORT ?? 3333

import ReviewAPI from './api/review.js'
const reviewApi = new ReviewAPI()

server.get('/review', async (req, res) => {
    try {
        const reviews = await reviewApi.getReviews(req.query.search)
        return reviews
    } catch(err) {
        return res.status(500).send(err)
    }
})

server.post('/review', async (req, res) => {
    try {
        const review = await reviewApi.createReview(req.body)
        return res.status(201).send(review)
    } catch(err) {
        return res.status(500).send(err)
    }
})

server.put('/review/:id', async (req, res) => {
    const reviewId = req.params.id

    try {
        const review = await reviewApi.updateReview(reviewId, req.body)
        return res.status(200).send(review)
    } catch(err) {
        return res.status(500).send(err)
    }
})

server.delete('/review/:id', async (req, res) => {
    const reviewId = req.params.id

    try {
        await reviewApi.deleteReview(reviewId)
        return res.status(204).send()
    } catch(err) {
        return res.status(500).send(err)
    }
})

server.listen({ port })