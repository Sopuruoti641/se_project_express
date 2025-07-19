const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors"); // ✅ Add this
const mainRouter = require("./routes/index");

const app = express();
const { PORT = 3001 } = process.env;

// ✅ CORS Setup
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json());

app.use("/", mainRouter);

mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db")
  .then(() => {
    console.log("Connected to DB");
  })
  .catch(console.error);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

// const express = require("express");
// const mongoose = require("mongoose");
// const mainRouter = require("./routes/index");

// const app = express();
// const { PORT = 3001 } = process.env;

// mongoose
//   .connect("mongodb://127.0.0.1:27017/wtwr_db")
//   .then(() => {
//     console.log("Connected to DB");
//   })
//   .catch(console.error);

// app.use(express.json());
// app.use("/", mainRouter);

// app.listen(PORT, () => {
//   console.log(`Listening on port ${PORT}`);
// });
