import prismaClient from 'prisma'

export type Review = {
    id?: string
    content: string
    image?: string
    title: string
    text: string
    author: string
    rating: number
    createdAt?: Date
}

const missingIdError = "Invalid request! Review ID not provided."
const notFoundError = "Review not found with the given ID."

export default class ReviewService {
    async get(search: string) {
        return await prismaClient.review.findMany({ where: { content: search } })
    }

    async getById(id: string) {
        if(!id) throw new Error(missingIdError)

        const reviewFound = await prismaClient.review.findFirst({ where: { id } })
        if(!reviewFound) throw new Error(notFoundError)

        return reviewFound
    }

    async create(review: Review) {
        const { content, image, title, text, author, rating } = review

        if(!content || !title || !text || !author || !rating) {
            throw new Error("Invalid request! Mandatory fields not filled in.")
        }

        return await prismaClient.review.create({
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

    async update(id: string, review: Review) {
        const { content, image, title, text, author, rating } = review

        if(!id) throw new Error(missingIdError)

        const reviewFound = await prismaClient.review.findFirst({ where: { id } })
        if(!reviewFound) throw new Error(notFoundError)
        
        return await prismaClient.review.update({
            where: { id: reviewFound.id },
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

    async delete(id: string) {
        if(!id) throw new Error(missingIdError)

        const reviewFound = await prismaClient.review.findFirst({ where: { id } })
        if(!reviewFound) throw new Error(notFoundError)

        await prismaClient.review.delete({
            where: { id: reviewFound.id }
        })
    }
}