import { getTodos } from "@/db/todos"
import { TodoItem } from "@/components/TodoItem"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Todos",
}

export default async function TodosPage() {
  const todos = await getTodos()

  return (
    <>
      <h1 className="page-title">Todos</h1>
      <ul>
        {todos.map(todo => (
          <TodoItem key={todo.id} {...todo} />
        ))}
      </ul>
    </>
  )
}
