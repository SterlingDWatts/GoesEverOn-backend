const express = require("express");
const app = express();

// Router-level middleware
const checkForAbbreviationLength = (req, _, next) => {
  const abbreviation = req.params.abbreviation;
  if (abbreviation.length !== 2) {
    next(`State abbreviation "${abbreviation}" is invalid.`);
  } else {
    next();
  }
};

// Routes
app.get(
  "/states/:abbreviation",
  checkForAbbreviationLength,
  // eslint-disable-next-line no-unused-vars
  (req, res, _) => {
    res.send(`${req.params.abbreviation} is a nice state, I'd like to visit.`);
  },
);

app.get(
  "/travel/:abbreviation",
  checkForAbbreviationLength,
  // eslint-disable-next-line no-unused-vars
  (req, res, _) => {
    res.send(`Enjoy your trip to ${req.params.abbreviation}!`);
  },
);

// Error handlers
// eslint-disable-next-line no-unused-vars
app.use((req, res, _) => {
  res.send(`The route ${req.path} does not exist!`);
});

// eslint-disable-next-line no-unused-vars
app.use((err, _, res, _1) => {
  console.error(err);
  res.send(err);
});

module.exports = app;
