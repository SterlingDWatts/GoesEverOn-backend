const express = require("express");
const cors = require("cors");
const showsRouter = require("./shows/shows.router");

const app = express();
app.use(express.json());

app.use(cors({ origin: /goeseveron\.com/ }));

app.use("/shows", showsRouter);

// Not found handler
app.use((req, _res, next) => {
  next({ status: 404, message: `Not found: ${req.originalUrl}` });
});

// Error handler
// eslint-disable-next-line no-unused-vars
app.use((error, _req, res, _next) => {
  const { status = 500, message = "Something went wrong!" } = error;
  res.status(status).json({ error: message });
});

module.exports = app;
