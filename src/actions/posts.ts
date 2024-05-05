"use server"

import { createPost, deletePost, updatePost } from "@/db/posts"
import { revalidatePath, revalidateTag } from "next/cache"
import { redirect } from "next/navigation"

export async function createPostAction(prevState: unknown, formData: FormData) {
  if (formData.get("title") === "")
    return { errorMessage: ["title", "Title field is required."] }
  if (formData.get("body") === "")
    return { errorMessage: ["body", "Body field is required"] }

  const post = await createPost(
    formData.get("title")?.toString() || "",
    formData.get("body")?.toString() || "",
    Number(formData.get("userId"))
  )

  revalidateTag("posts")
  redirect(`/posts/${post.id}`)
}

export async function updatePostAction(
  postId: string,
  prevState: unknown,
  formData: FormData
) {
  if (formData.get("title") === "")
    return { errorMessage: ["title", "Title field is required."] }
  if (formData.get("body") === "")
    return { errorMessage: ["body", "Body field is required"] }

  const post = await updatePost(
    Number(postId),
    formData.get("title")?.toString() || "",
    formData.get("body")?.toString() || "",
    Number(formData.get("userId"))
  )

  revalidateTag("posts")
  revalidatePath(`/posts/${post.id}`)
  redirect(`/posts/${post.id}`)
}

export async function deletePostAction(postId: string) {
  await deletePost(postId)

  revalidateTag("posts")
  revalidatePath(`/posts/${postId}`)
  redirect("/posts")
}
