import { Prisma } from "@prisma/client"
import prisma from "./db"
import { unstable_cache } from "next/cache"
import { cache } from "react"

export const getPosts = unstable_cache(
  cache((query?: string, userId?: string | number) => {
    const where: Prisma.PostFindManyArgs["where"] = {}
    if (query) {
      where.OR = [{ title: { contains: query } }, { body: { contains: query } }]
    }

    if (userId) {
      where.userId = Number(userId)
    }

    return prisma.post.findMany({ where })
  }),
  ["posts"],
  { tags: ["posts"] }
)

export const getUserPosts = unstable_cache(
  cache((userId: string | number) => {
    return prisma.post.findMany({ where: { userId: Number(userId) } })
  }),
  ["posts", "userId"],
  { tags: ["posts"] }
)

export const getPost = unstable_cache(
  cache((postId: string) => {
    return prisma.post.findUnique({ where: { id: Number(postId) } })
  }),
  ["posts", "postId"]
)

export function createPost(title: string, body: string, userId: number) {
  return prisma.post.create({
    data: {
      title,
      body,
      userId,
    },
  })
}

export function updatePost(
  postId: number,
  title: string,
  body: string,
  userId: number
) {
  return prisma.post.update({
    where: { id: postId },
    data: {
      title,
      body,
      userId,
    },
  })
}

export function deletePost(postId: string | number) {
  return prisma.post.delete({ where: { id: Number(postId) } })
}
