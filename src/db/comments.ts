import { cache } from "react"
import prisma from "./db"
import { unstable_cache } from "next/cache"

export const getPostComments = unstable_cache(
  cache((postId: string | number) => {
    return prisma.comment.findMany({ where: { postId: Number(postId) } })
  }),
  ["comments", "postId"],
  { tags: ["comments"] }
)
