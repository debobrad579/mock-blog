import { unstable_cache } from "next/cache"
import prisma from "./db"
import { cache } from "react"

export const getTodos = unstable_cache(
  cache(() => {
    return prisma.todo.findMany()
  }),
  ["todos"],
  { tags: ["todos"] }
)

export const getUserTodos = unstable_cache(
  cache((userId: string | number) => {
    return prisma.todo.findMany({ where: { userId: Number(userId) } })
  }),
  ["todos", "userId"],
  { tags: ["todos"] }
)
