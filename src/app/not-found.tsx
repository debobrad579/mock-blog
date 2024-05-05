import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Page Not Found",
}

export default function NotFound() {
  return <h1 className="page-title">404 - Page Not Found</h1>
}
