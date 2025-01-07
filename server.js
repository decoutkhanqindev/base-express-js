const express = require("express")
require("dotenv").config()

const env = process.env
const app = express()
const port = env.PORT
const hostname = env.HOSTNAME

app.get("/", function (req, res) { 
  res.send("Hello, World!")
})

app.listen(port, hostname, () => {
  console.log(`Server in listening on port ${port} and hostname ${hostname}`)
})
