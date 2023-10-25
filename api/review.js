import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default class ReviewAPI {
    async getReviews(search) {
        return await prisma.review.findMany({ where: { content: search } })
    }

    async createReview(review) {
        const { content, image, title, text, author, rating } = review
        return await prisma.review.create({
            data: { 
                content,
                image,
                title,
                text,
                author,
                rating
            }
        })
    }

    async updateReview(id, review) {
        const { content, image, title, text, author, rating } = review
        return await prisma.review.update({
            where: { id },
            data: { 
                content,
                image,
                title,
                text,
                author,
                rating
            }
        })
    }

    async deleteReview(id) {
        await prisma.review.delete({
            where: { id }
        })
    }
}