const express = require("express");
const pastes = require("./data/pastes-data");
const app = express();

app.use(express.json());

app.get("/pastes", (_req, res) => {
  res.json({ data: pastes });
});

// Variable to hold the next ID
// Because some IDs may already be used, find the largest assigned ID
let lastPasteId = pastes.reduce((maxId, paste) => Math.max(maxId, paste.id), 0);

// eslint-disable-next-line no-unused-vars
app.post("/pastes", (req, res, _next) => {
  const { data: { name, syntax, exposure, expiration, text, user_id } = {} } =
    req.body;
  if (text) {
    const newPaste = {
      id: ++lastPasteId, // Increment last ID, then assign as the current ID
      name,
      syntax,
      exposure,
      expiration,
      text,
      user_id,
    };
    pastes.push(newPaste);
    res.status(201).json({ data: newPaste });
  } else {
    res.sendStatus(400);
  }
});

// Not found handler
app.use((request, _response, next) => {
  next(`Not found: ${request.originalUrl}`);
});

// Error handler
// eslint-disable-next-line no-unused-vars
app.use((error, _request, response, _next) => {
  console.error(error);
  response.send(error);
});

module.exports = app;
