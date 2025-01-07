const express = require("express")
const path = require("path")
require("dotenv").config()

const app = express()
const env = process.env
const port = env.PORT || 8080 
const hostname = env.HOSTNAME

// ---------------------------------------------------------

app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))

app.get("/viewengine", (req, res) => {
  res.render("index.ejs")
})

// ---------------------------------------------------------

// app.method(path, handler)
app.get("/", function (req, res) { 
  res.send("Hello, World!")
})

app.get("/hello", (req, res) => {
  res.send("Hello, Minh Khang")
})

// ---------------------------------------------------------

// URL binding
app.get("/showId/:id", (req, res) => {
  res.send('The id you specified is ' + req.params.id)
})

app.get("/showIdAndName/:id/:name", (req, res) => { 
  res.send("id: " + req.params.id + " and name: " + req.params.name)
})

// ---------------------------------------------------------

//Middleware function to log request protocol
app.use('/things', function(req, res, next){
   console.log("A request for things received at " + Date.now());
   next();
});

// Route handler that sends the response
app.get('/things', function(req, res){
   res.send('Things');
});

// ---------------------------------------------------------

// First middleware before response is sent
app.use("/test", (req, res, next) => {
  console.log("Start")
  next()
})
// Route handler
app.get("/test", (req, res, next) => {
  res.send("Test")
  next()
})

// Last middleware after reponse is sent
app.use('/test', (req, res) =>{
   console.log('End');
});

// ---------------------------------------------------------

app.listen(port, hostname, () => {
   console.log(`Server running at http://localhost:${port}/`);
})
