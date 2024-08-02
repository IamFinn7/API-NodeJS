const express = require("express");

// Import middlewares
const middleware = require("../middlewares/middlewares");

const appRouter = express.Router();

appRouter.use(middleware);

const {
  getAllUser,
  getUserByID,
  createUser,
  editUserByID,
  deleteUserByID,
} = require("../handlers");

// user
appRouter.get("/user", getAllUser);
appRouter.get("/user/:id", getUserByID);
appRouter.post("/user", createUser);
appRouter.put("/user/:id", editUserByID);
appRouter.delete("/user/:id", deleteUserByID);

module.exports = appRouter;
