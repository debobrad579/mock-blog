import { FormGroup } from "@/components/FormGroup"
import { SkeletonInput } from "@/components/Skeleton"
import Link from "next/link"

export default function LoadingEditPostPage() {
  return (
    <>
      <h1 className="page-title">Edit Post</h1>
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
        <div className="form-row">
          <button className="btn btn-danger" disabled>
            Delete
          </button>
          <div className="form-btn-row">
            <Link className="btn btn-outline disabled" href={`/posts`}>
              Cancel
            </Link>
            <button className="btn" disabled>
              Save
            </button>
          </div>
        </div>
      </form>
    </>
  )
}
