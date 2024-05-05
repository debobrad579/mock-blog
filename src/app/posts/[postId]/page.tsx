import { getPostComments } from "@/db/comments"
import { getPost } from "@/db/posts"
import { getUser } from "@/db/users"
import { Skeleton, SkeletonList } from "@/components/Skeleton"
import Link from "next/link"
import { Suspense } from "react"
import { notFound } from "next/navigation"
import { Metadata } from "next"

type Props = { params: { postId: string } }

export function generateMetadata({ params: { postId } }: Props): Metadata {
  return { title: `Post - ${postId}` }
}

export default function PostPage({ params: { postId } }: Props) {
  return (
    <>
      <Suspense
        fallback={
          <>
            <h1 className="page-title">
              <Skeleton inline short />
            </h1>
            <span className="page-subtitle">
              By: <Skeleton short inline />
            </span>
            <div>
              <Skeleton />
              <Skeleton />
              <Skeleton />
            </div>
          </>
        }
      >
        <PostDetails postId={postId} />
      </Suspense>

      <h3 className="mt-4 mb-2">Comments</h3>
      <div className="card-stack">
        <Suspense
          fallback={
            <SkeletonList amount={5}>
              <div className="card">
                <div className="card-body">
                  <div className="text-sm mb-1">
                    <Skeleton short />
                  </div>
                  <Skeleton />
                  <Skeleton />
                </div>
              </div>
            </SkeletonList>
          }
        >
          <Comments postId={postId} />
        </Suspense>
      </div>
    </>
  )
}

async function PostDetails({ postId }: { postId: string }) {
  const post = await getPost(postId)

  if (post == null) notFound()

  return (
    <>
      <h1 className="page-title">
        {post.title}
        <div className="title-btns">
          <Link className="btn btn-outline" href={`/posts/${post.id}/edit`}>
            Edit
          </Link>
        </div>
      </h1>
      <span className="page-subtitle">
        By:{" "}
        <Suspense fallback={<Skeleton short inline />}>
          <UserDetails userId={post.userId} />
        </Suspense>
      </span>
      <div>{post.body}</div>
    </>
  )
}

async function UserDetails({ userId }: { userId: number }) {
  const user = await getUser(userId)
  if (user == null) return "User Deleted"
  return <Link href={`/users/${user.id}`}>{user.name}</Link>
}

async function Comments({ postId }: { postId: string }) {
  const comments = await getPostComments(postId)

  return comments.map(comment => (
    <div key={comment.id} className="card">
      <div className="card-body">
        <div className="text-sm mb-1">{comment.email}</div>
        {comment.body}
      </div>
    </div>
  ))
}
