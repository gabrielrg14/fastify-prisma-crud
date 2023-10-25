import { fastify } from 'fastify'
import { DatabaseMemory } from './db.js'

const server = fastify()
const db = new DatabaseMemory()
const port = 3333

// Query Parameter
server.get('/reviews', (req) => {
    const search = req.query.search
    const reviews = db.getReviews(search)
    return reviews
})

// Request Body
server.post('/reviews', (req, res) => {
    const { content, image, title, text, author, rating } = req.body

    db.createReview({ 
        content,
        image,
        title,
        text,
        author,
        rating
    })

    return res.status(201).send()
})

// Route Parameter
server.put('/reviews/:id', (req, res) => {
    const reviewId = req.params.id
    const { content, image, title, text, author, rating } = req.body

    db.updateReview(reviewId, { 
        content,
        image,
        title,
        text,
        author,
        rating
    })

    return res.status(204).send()
})

server.delete('/reviews/:id', (req, res) => {
    const reviewId = req.params.id
    db.deleteReview(reviewId)
    return res.status(204).send()
})

server.listen({ port })