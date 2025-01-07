const express = require('express')
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
const multer = require('multer');
const path = require('path')
const upload = multer();
require('dotenv').config()

const app = express()
const port = process.env.PORT || 3000

app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(upload.array())

// Require the Router we defined in movies.js
const movies = require(path.join(__dirname, 'movies'))

// Use the Router on the sub route /movies
app.use('/movies', movies) 

app.listen(port, () => {
  console.log(`Movies Server is running at http://localhost:${port}/movies/`)
})
