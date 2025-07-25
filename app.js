const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors"); // ✅ Add this
const { celebrate, Joi } = require("celebrate");
const { login, createUser } = require("./controllers/users");
const mainRouter = require("./routes/index");
const errorHandler = require("./middleware/error-handler");
const { requestLogger, errorLogger } = require("./middleware/log");
const { errors } = require("celebrate");

const app = express();
const { PORT = 3001 } = process.env;

mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db")
  .then(() => {
    console.log("Connected to DB");
  })
  .catch(console.error);

// ✅ CORS Setup
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json());

app.get("/crash-test", () => {
  setTimeout(() => {
    throw new Error("Server will crash now");
  }, 0);
});

app.post(
  "/signin",
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    }),
  }),
  login
);
app.post(
  "/signup",
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      avatar: Joi.string().required().uri(),
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    }),
  }),
  createUser
);

app.use(errors());
app.use("/", mainRouter);

app.use(errorHandler);

app.use(requestLogger);

app.use(errorLogger);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
