const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const { result } = require("lodash");
const blogRoutes = require('./routes/blogroutes');

//express app
const app = express();

//connect to mongo db
const dbURI = "mongodb+srv://Shehroz29:DE7OhqpZz0jUP6TV@nodetutes.pqnqv05.mongodb.net/test";
mongoose
  .connect(dbURI)
  .then((result) => app.listen(8080))
  .catch((error) => console.log(error));

// register view engine
app.set("view engine", "ejs");



//morgan automated logger middleware
app.use(morgan("dev"));

// this middleware passes the form data into an object so that POST req can use it(we can simply say that this middleware is for accepting form data)
app.use(express.urlencoded({extended:true}));

//static middleware
app.use(express.static("public"));



//make HTML routes
app.get("/", (req, res) => {
  // res.send('Hello World!');                                    //getting string response
  // res.send(`<p>This is my first express app</p>`);             //getting string response
  // res.sendFile('./views/index.html',{root:__dirname});
    res.redirect('/blogs');
});

app.get("/about", (req, res) => {
  // res.sendFile('./views/about.html',{root:__dirname});
  res.render("about", { title: "About" });
});

// Blog Routes
app.use(blogRoutes);

// route for redirect
app.get("/aboutus", (req, res) => {
  res.redirect("/about");
});

// route for 404 page
app.use((req, res) => {
  // res.status(404).sendFile('./views/404.html',{root:__dirname});              // here we manually tell function status code of 404 because it doesn't detect it an error
  res.status(404).render("404", { title: "404" });
});
