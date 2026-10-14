import { useState, type FormEvent } from 'react'
import { Button } from './components/Button'
import './App.css'

interface Todo {
  id: number
  text: string
  done: boolean
}

function App() {
  const [count, setCount] = useState<number>(0)
  const [todos, setTodos] = useState<Todo[]>([
    { id: 1, text: 'Create a typed component', done: true },
    { id: 2, text: 'Keep state predictable', done: false },
  ])
  const [draft, setDraft] = useState('')

  function addTodo(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const text = draft.trim()
    if (!text) return

    setTodos((currentTodos) => [
      ...currentTodos,
      { id: Date.now(), text, done: false },
    ])
    setDraft('')
  }

  function toggleTodo(id: number) {
    setTodos((currentTodos) =>
      currentTodos.map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo,
      ),
    )
  }

  return (
    <main className="app-shell">
      <header className="topbar">
        <a className="wordmark" href="#home" aria-label="TypeScript Lab home">
          <span className="wordmark-mark">TS</span>
          <span>FIELDNOTES</span>
        </a>
        <span className="topbar-caption">REACT / TYPESCRIPT / 001</span>
      </header>

      <section className="intro" id="home">
        <p className="eyebrow">A SMALL INTERACTIVE DEMO</p>
        <h1>Make state<br /><span>feel simple.</span></h1>
        <p className="intro-copy">
          A tiny playground for typed state, reusable UI, and the everyday
          patterns that make React click.
        </p>
      </section>

      <section className="workspace" aria-label="Interactive React examples">
        <article className="demo-panel counter-panel">
          <div className="panel-heading">
            <div>
              <p className="panel-index">01 / STATE</p>
              <h2>Click counter</h2>
            </div>
            <span className="panel-tag">useState&lt;number&gt;</span>
          </div>
          <div className="counter-display" aria-live="polite">{count}</div>
          <div className="counter-controls">
            <Button variant="quiet" onClick={() => setCount((value) => value - 1)}>
              −
            </Button>
            <span className="counter-caption">CURRENT COUNT</span>
            <Button onClick={() => setCount((value) => value + 1)}>
              Add one <span aria-hidden="true">+</span>
            </Button>
          </div>
        </article>

        <article className="demo-panel todo-panel">
          <div className="panel-heading">
            <div>
              <p className="panel-index">02 / COLLECTIONS</p>
              <h2>Today’s list</h2>
            </div>
            <span className="todo-count">{todos.filter((todo) => !todo.done).length} OPEN</span>
          </div>
          <form className="todo-form" onSubmit={addTodo}>
            <label className="visually-hidden" htmlFor="todo-draft">Add a task</label>
            <input
              id="todo-draft"
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              placeholder="Write a task..."
            />
            <Button type="submit" aria-label="Add task">+</Button>
          </form>
          <ul className="todo-list">
            {todos.map((todo) => (
              <li key={todo.id}>
                <label className={`todo-item${todo.done ? ' is-done' : ''}`}>
                  <input
                    type="checkbox"
                    checked={todo.done}
                    onChange={() => toggleTodo(todo.id)}
                  />
                  <span className="todo-check" aria-hidden="true" />
                  <span>{todo.text}</span>
                </label>
              </li>
            ))}
          </ul>
        </article>
      </section>

      <footer className="page-footer">
        <span>BUILT WITH REACT + TYPESCRIPT</span>
        <span>SMALL STEPS, STRONG TYPES <span className="footer-star">✳</span></span>
      </footer>
    </main>
  )
}

export default App
