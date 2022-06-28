import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchTodos } from "../../features/todos/todoSlice"
import Todo from "../todo/Todo"
import CircularProgress from "@mui/material/CircularProgress"

import styles from "./Todos.module.css"

function Todos() {
  const todos = useSelector((state) => state.todos)
  const process = useSelector((state) => state.process)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchTodos())
  }, [dispatch])

  return (
    <div className={styles.todos}>
      {process && (
        <CircularProgress color="secondary" className={styles.loader} />
      )}
      {todos.map((todo) => {
        return <Todo key={todo._id} todo={todo} />
      })}
    </div>
  )
}

export default Todos
