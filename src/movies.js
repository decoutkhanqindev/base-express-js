const express = require('express')
const router = express.Router()

// Mock data
const movies = [
  { id: 101, name: "Fight Club", year: 1999, rating: 8.1 },
  { id: 102, name: "Inception", year: 2010, rating: 8.7 },
  { id: 103, name: "The Dark Knight", year: 2008, rating: 9 },
  { id: 104, name: "12 Angry Men", year: 1957, rating: 8.9 }
]

// say hello
router.get('/', (req, res) => {
  res.json(
    {
      message: "Hello, This is Movies Server"
    }
  )
})

// get movies list
router.get('/list', (req, res) => {
  res.json(movies)
})

// get movie by id 
router.get('/:id', (req, res) => {
  const currentMovie = movies.filter((movie) => {
    if (movie.id == req.params.id) {
      return true
    }
  })

  if (currentMovie.length == 1) {
    res.status(200)
    res.json(movies[0])
  } else {
    res.status(404)
    res.json(
      {
        message: 'Not found' 
      }
    )
  }
})

// post movie to list
router.post('/add', (req, res) => {
  const body = req.body
  if (!body.name || !body.year || !body.rating) {
    res.status(400)
    res.json(
      {
        message: 'Bad request'
      }
    )
  } else {
    let newId = movies[movies.length - 1].id + 1
    movies.push(
      {
        id: newId,
        name: body.name,
        year: body.year,
        rating: body.rating
      }  
    )
    res.status(200)
    res.json(
      {
        message: "New movie added.",
        path: "/movies/" + newId
      }
    )
  }
})

// put movie by id
router.put('/update/:id', (req, res) => {
  const body = req.body
  const id = parseInt(req.params.id)
  if (!body.name|| !body.year || !body.rating) {
    res.status(400)
    res.json(
      {
        message: "Bad request"
      }
    )
  } else {
    let updateIndex = movies.map((movie) => {
      return movie.id
    }).indexOf(id)

    if (updateIndex === -1) {
      // Movie not found, add new
      movies.push(
        {
          id: id,
          name: body.name,
          year: parseInt(body.year),
          rating: parseInt(body.rating)
        }
      )
      res.status(200)
      res.json(
        {
          message: "New movie added.",
          path: "/movies/" + newId
        }
      )
    } else {
      // Update existing movie
      movies[updateIndex] = {
          id: id,
          name: body.name,
          year: parseInt(body.year),
          rating: parseInt(body.rating)
      }
      res.status(200)
      res.json(
        {
          message: "Movie id " + id + " updated.", 
          path: "/movies/" + id
        }
      )
    }
  }
})

// delete movie by id
router.delete('/delete/:id', (req, res) => {
  const body = req.body
  const id = parseInt(req.params.id)

  let deleteIndex = movies.map((movie) => {
      return movie.id
  }).indexOf(id)

  if(deleteIndex === -1){
    res.json(
      {
       message: "Not found"
      }
    )
   } else {
    movies.splice(deleteIndex, 1);
      res.json(
        {
          message: "Movie id " + id + " removed."
        }
      )
   }
})

module.exports = router