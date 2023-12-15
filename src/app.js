const express = require("express");
const app = express();
const showsRouter = require("./shows/shows.router");

app.use(express.json());

app.use("/shows", showsRouter);
app.get("/", (_req, res, next) => {
  res.status(200).send("Hello World!");
  next();
});

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
