const express = require("express");

const webRoute = express.Router();

webRoute.get("/", (req, res) => {
  res.render("home.ejs");
});
webRoute.get("/create", (req, res) => {
  res.render("create.ejs");
});
webRoute.get("/edit/:id", (req, res) => {
  res.render("edit.ejs");
});

module.exports = webRoute;
