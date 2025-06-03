const express = require("express");
const mongoose = require("mongoose");
const { PORT = 3001 } = process.env;

const app = express();

mongoose
  .connect("mongodb://localhost:27017/wtwr_db")
  .then(() => {
    console.log("Connected to DB");

    app.use(express.json());
    const routes = require("./routes");
    app.use(routes);

    app.listen(PORT, () => {
      console.log(`App listening at port ${PORT}`);
      console.log("This is working");
    });
  })
  .catch((err) => {
    console.error("Failed to connect to DB", err);
  });
