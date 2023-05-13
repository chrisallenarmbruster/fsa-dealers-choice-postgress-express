const express = require("express")
const morgan = require("morgan")
const pgRouter = require("./routes/pg.js")
const mongoRouter = require("./routes/mongo.js")

const PORT = 1337
const app = express()

app.use(morgan("dev"))
// app.use(express.json())
// app.use(express.urlencoded({ extended: false }))
app.use(express.static(__dirname + "/public"))

app.use("/", pgRouter)

//future route for practice w/ a nosql database
app.use("/mongo", mongoRouter)

app.use((err, req, res, next) => {
  console.log(err)
  res.status(500).send(err.message)
})

app.listen(PORT, () => {
  console.log(`App listening in port ${PORT}`)
})
