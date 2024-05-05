import { getPosts } from "@/db/posts"
import { PostCard, SkeletonPostCard } from "@/components/PostCard"
import { SkeletonList } from "@/components/Skeleton"
import { Suspense } from "react"
import { SearchForm } from "./SearchForm"
import { UserSelectOptions } from "./UserSelectOptions"
import Link from "next/link"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Posts",
}

export default function PostsPage({
  searchParams: { query = "", userId = "" },
}: {
  searchParams: { query: string; userId: string }
}) {
  return (
    <>
      <h1 className="page-title">
        Posts
        <div className="title-btns">
          <Link className="btn btn-outline" href="posts/new">
            New
          </Link>
        </div>
      </h1>

      <SearchForm userSelectOptions={<UserSelectOptions withAnyOption />} />

      <div className="card-grid">
        <Suspense
          key={`${query}-${userId}`}
          fallback={
            <SkeletonList amount={6}>
              <SkeletonPostCard />
            </SkeletonList>
          }
        >
          <PostGrid query={query} userId={userId} />
        </Suspense>
      </div>
    </>
  )
}

async function PostGrid({ query, userId }: { query: string; userId: string }) {
  const posts = await getPosts(query, userId)

  return posts.map(post => <PostCard key={post.id} {...post} />)
}
