require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { errors } = require("celebrate");

const mainRouter = require("./routes/index");
const errorHandler = require("./middleware/error-handler");
const { requestLogger, errorLogger } = require("./middleware/logger");

const app = express();
const { PORT = 3001 } = process.env;

mongoose.connect("mongodb://127.0.0.1:27017/wtwr_db").then().catch();

app.use(express.json());

const corsOptions = {
  origin: "https://wtwr-web.home.kg",
};

app.use(cors(corsOptions));

app.use(requestLogger);

app.get("/crash-test", () => {
  setTimeout(() => {
    throw new Error("Server will crash now");
  }, 0);
});

app.use("/", mainRouter);

app.use(errorLogger);

app.use(errors());

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
