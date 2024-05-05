"use client"

import { FormGroup } from "@/components/FormGroup"
import { ReactNode, Suspense } from "react"
import { createPostAction } from "@/actions/posts"
import { useFormState, useFormStatus } from "react-dom"
import Link from "next/link"

export function NewPostForm({
  userSelectOptions,
}: {
  userSelectOptions: ReactNode
}) {
  const [error, action] = useFormState(createPostAction, {
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
          <input type="text" name="title" id="title" required />
        </FormGroup>
        <FormGroup>
          <label htmlFor="userId">Author</label>
          <select name="userId" id="userId">
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
          <textarea name="body" id="body" required />
        </FormGroup>
      </div>
      <NewFormButtons />
    </form>
  )
}

export function NewFormButtons() {
  const { pending } = useFormStatus()

  return (
    <div className="form-row form-btn-row">
      <Link
        className={`btn btn-outline ${pending ? "disabled" : ""}`}
        href="/posts"
      >
        Cancel
      </Link>
      <button className="btn" disabled={pending}>
        {pending ? "Creating..." : "Create"}
      </button>
    </div>
  )
}
