import { Metadata } from "next"
import { UserSelectOptions } from "../UserSelectOptions"
import { NewPostForm } from "./NewPostForm"

export const metadata: Metadata = {
  title: "New Post",
}

export default function NewPostPage() {
  return (
    <>
      <h1 className="page-title">New Post</h1>
      <NewPostForm userSelectOptions={<UserSelectOptions />} />
    </>
  )
}
