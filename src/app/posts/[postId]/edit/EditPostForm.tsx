"use client"

import { ReactNode, Suspense, useTransition } from "react"
import { FormGroup } from "@/components/FormGroup"
import { deletePostAction, updatePostAction } from "@/actions/posts"
import { useFormState, useFormStatus } from "react-dom"
import Link from "next/link"

export function EditPostForm({
  userSelectOptions,
  postId,
  defaultTitle,
  defaultBody,
  defaultUserId,
}: {
  userSelectOptions: ReactNode
  postId: string
  defaultTitle: string
  defaultBody: string
  defaultUserId: string
}) {
  const [error, action] = useFormState(updatePostAction.bind(null, postId), {
    errorMessage: ["no-message", "no-message"],
  })

  return (
    <form className="form" action={action}>
      <div className="form-row">
        <FormGroup
          errorMessage={
            error.errorMessage[0] === "title"
              ? error.errorMessage[1]
              : undefined
          }
        >
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            id="title"
            defaultValue={defaultTitle}
            required
          />
        </FormGroup>
        <FormGroup>
          <label htmlFor="userId">Author</label>
          <select name="userId" id="userId" defaultValue={defaultUserId}>
            <Suspense fallback={<option value="">Loading...</option>}>
              {userSelectOptions}
            </Suspense>
          </select>
        </FormGroup>
      </div>
      <div className="form-row">
        <FormGroup
          errorMessage={
            error.errorMessage[0] === "body" ? error.errorMessage[1] : undefined
          }
        >
          <label htmlFor="body">Body</label>
          <textarea name="body" id="body" defaultValue={defaultBody} required />
        </FormGroup>
      </div>
      <EditPostButtons postId={postId} />
    </form>
  )
}

export function EditPostButtons({ postId }: { postId: string }) {
  const { pending } = useFormStatus()
  const [deletePending, startDeleteTransition] = useTransition()

  return (
    <div className="form-row">
      <button
        className="btn btn-danger"
        onClick={e => {
          e.preventDefault()

          startDeleteTransition(async () => {
            await deletePostAction(postId)
          })
        }}
        disabled={pending || deletePending}
      >
        {deletePending ? "Deleting..." : "Delete"}
      </button>
      <div className="form-btn-row">
        <Link
          className={`btn btn-outline ${
            pending || deletePending ? "disabled" : ""
          }`}
          href={`/posts/${postId}`}
        >
          Cancel
        </Link>
        <button className="btn" disabled={pending || deletePending}>
          {pending ? "Saving..." : "Save"}
        </button>
      </div>
    </div>
  )
}
