import { FormGroup } from "@/components/FormGroup"
import { SkeletonInput } from "@/components/Skeleton"
import Link from "next/link"

export default function LoadingNewPostPage() {
  return (
    <>
      <h1 className="page-title">New Post</h1>
      <form className="form">
        <div className="form-row">
          <FormGroup>
            <label htmlFor="title">Title</label>
            <SkeletonInput />
          </FormGroup>
          <FormGroup>
            <label htmlFor="userId">Author</label>
            <SkeletonInput />
          </FormGroup>
        </div>
        <div className="form-row">
          <FormGroup>
            <label htmlFor="body">Body</label>
            <SkeletonInput />
          </FormGroup>
        </div>
        <div className="form-row form-btn-row">
          <div className="form-btn-row">
            <Link className="btn btn-outline disabled" href="/posts">
              Cancel
            </Link>
            <button className="btn" disabled>
              Create
            </button>
          </div>
        </div>
      </form>
    </>
  )
}
