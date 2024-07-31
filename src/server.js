require("dotenv").config();

const configViewEngine = require("./config/viewEngine");
const express = require("express");
const appRouter = require("./routers/index");

const app = express();

const port = process.env.PORT || 3333; //if the port fails, use another one
const hostname = process.env.HOST_NAME;

//region middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1", appRouter);

//config template engine
configViewEngine(app);

app.listen(port, hostname, () => {
  console.log(`Example app listening on port ${port}`);
});
