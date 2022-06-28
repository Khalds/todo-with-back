import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

const initialState = {
  todos: [],
  loading: false,
  process: false,
}

export const fetchTodos = createAsyncThunk(
  "todo/fetch",
  async (_, thunkAPI) => {
    try {
      const res = await fetch("http://localhost:3001/todo")
      return res.json()
    } catch (e) {
      return thunkAPI.rejectWithValue(e)
    }
  }
)

export const postTodo = createAsyncThunk(
  "todo/post",
  async (text, thunkAPI) => {
    try {
      const res = await fetch("http://localhost:3001/todo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      })
      return await res.json()
    } catch (e) {
      return thunkAPI.rejectWithValue(e)
    }
  }
)

export const removeTodo = createAsyncThunk(
  "todo/remove",
  async (id, thunkAPI) => {
    try {
      await fetch(`http://localhost:3001/todo/${id}`, {
        method: "DELETE",
      })
      return id
    } catch (e) {
      return thunkAPI.rejectWithValue(e)
    }
  }
)

export const chekedTodo = createAsyncThunk(
  "todo/patch",
  async (todo, thunkAPI) => {
    try {
      const res = await fetch(`http://localhost:3001/todo/${todo._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          completed: !todo.completed,
        }),
      })
      return res.json()
    } catch (e) {
      return thunkAPI.rejectWithValue(e)
    }
  }
)

export const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducer: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.todos = action.payload
        state.loading = false
      })
      .addCase(fetchTodos.pending, (state, action) => {
        state.loading = true
      })
      .addCase(postTodo.fulfilled, (state, action) => {
        state.todos.unshift(action.payload)
        state.process = false
      })
      .addCase(postTodo.pending, (state, action) => {
        state.process = true
      })
      .addCase(removeTodo.fulfilled, (state, action) => {
        state.process = false
        state.todos = state.todos.filter((todo) => {
          return todo._id !== action.payload
        })
      })
      .addCase(removeTodo.pending, (state, action) => {
        state.process = true
      })
      .addCase(chekedTodo.fulfilled, (state, action) => {
        state.process = false

        state.todos = state.todos.map((todo) => {
          if (todo._id === action.payload._id) {
            return action.payload
          }
          return todo
        })
      })
  },
})

export default todoSlice.reducer
