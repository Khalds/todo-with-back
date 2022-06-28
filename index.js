const express = require("express")
const cors = require('cors')
const mongoose = require("mongoose")

const app = express()

app.use(cors())
app.use(express.json())
app.use(require("./routes/todo.route"))

mongoose
  .connect("mongodb+srv://admin:1111@cluster0.eazqc.mongodb.net/todo", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Успешно соединились с сервером MongoDB"))
  .catch(() => console.log("Ошибка при соединении с сервером MongoDB"))

app.listen(3001, () => {
  console.log(`Example app listening at http://localhost:${3001}`)
})
