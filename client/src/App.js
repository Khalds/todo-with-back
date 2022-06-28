import Input from "./components/Input/Input"
import "./App.css"
import Todos from "./components/todos/Todos"
import { LinearProgress } from "@mui/material"
import { useSelector } from "react-redux"

function App() {
  const loading = useSelector((state) => state.loading)

  return (
    <>
      {loading && <LinearProgress color="secondary" />}
      <div className="App">
        <Input />
        <Todos />
      </div>
    </>
  )
}

export default App
