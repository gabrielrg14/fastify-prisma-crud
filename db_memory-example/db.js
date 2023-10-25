import { randomUUID } from 'node:crypto'

export class DatabaseMemory {
    #reviews = new Map()

    getReviews(search) {
        return Array.from(this.#reviews.entries())
            .map((reviewArray) => {
                const id = reviewArray[0]
                const data = reviewArray[1]

                return { id, ...data }
            })
            .filter(review => {
                if(search) return review.content.toLowerCase().includes(search.toLowerCase())
                return true
            })
    }

    createReview(review) {
        const reviewId = randomUUID() // UUID - Universal Unique ID
        this.#reviews.set(reviewId, review)
    }

    updateReview(id, review) {
        this.#reviews.set(id, review)
    }

    deleteReview(id) {
        this.#reviews.delete(id)
    }
}