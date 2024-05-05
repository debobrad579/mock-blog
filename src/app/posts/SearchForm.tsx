"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { FormGroup } from "../../components/FormGroup"
import { ReactNode, Suspense, useState } from "react"

export function SearchForm({
  userSelectOptions,
}: {
  userSelectOptions: ReactNode
}) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [query, setQuery] = useState(searchParams.get("query") || "")
  const [userId, setUserId] = useState(searchParams.get("userId") || "")

  return (
    <form
      className="form mb-4"
      onSubmit={e => {
        e.preventDefault()
        const params = new URLSearchParams(searchParams)
        params.set("query", query)
        params.set("userId", userId)
        router.push(`${pathname}?${params}`)
      }}
    >
      <div className="form-row">
        <FormGroup>
          <label htmlFor="query">Query</label>
          <input
            type="search"
            name="query"
            id="query"
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <label htmlFor="userId">Author</label>
          <select
            name="userId"
            id="userId"
            value={userId}
            onChange={e => setUserId(e.target.value)}
          >
            <Suspense fallback={<option value="">Loading...</option>}>
              {userSelectOptions}
            </Suspense>
          </select>
        </FormGroup>
        <button className="btn">Filter</button>
      </div>
    </form>
  )
}
