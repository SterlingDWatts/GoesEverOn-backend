const bcrypt = require("bcryptjs");
const authService = require("./auth.service");
const hasProperties = require("../errors/hasProperties");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

const hasRequiredProperties = hasProperties("user_email", "user_sub");

async function userExists(req, res, next) {
  const { data = {} } = req.body;
  const user = await authService.validate(data.user_email);
  if (user) {
    res.locals.user = user;
    return next();
  }

  next({ status: 404, message: `User cannot be found.` });
}

async function userSubMatches(req, res, next) {
  const { data = {} } = req.body;
  const { user } = res.locals;
  const isMatch = await bcrypt.compare(data.user_sub, user.user_sub);
  if (isMatch) {
    return next();
  }

  next({ status: 401, message: `Unauthorized.` });
}

async function validate(_req, res) {
  res.status(200).send("Validated.");
}

module.exports = {
  validate: [
    hasRequiredProperties,
    asyncErrorBoundary(userExists),
    asyncErrorBoundary(userSubMatches),
    validate,
  ],
};
