import { notFound } from "next/navigation"
import { UserSelectOptions } from "../../UserSelectOptions"
import { getPost } from "@/db/posts"
import { EditPostForm } from "./EditPostForm"
import { Metadata } from "next"
import { getUsers } from "@/db/users"

type Props = { params: { postId: string } }

export function generateMetadata({ params: { postId } }: Props): Metadata {
  return { title: `Edit Post - ${postId}` }
}

export default async function EditPostPage({ params: { postId } }: Props) {
  const [post, users] = await Promise.all([getPost(postId), getUsers()])
  if (post == null) return notFound()

  return (
    <>
      <h1 className="page-title">Edit Post</h1>
      <EditPostForm
        userSelectOptions={<UserSelectOptions users={users} />}
        postId={postId}
        defaultTitle={post.title}
        defaultBody={post.body}
        defaultUserId={post.userId.toString()}
      />
    </>
  )
}
