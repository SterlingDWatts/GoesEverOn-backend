const showsService = require("./shows.service");
const hasProperties = require("../errors/hasProperties");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

const hasRequiredProperties = hasProperties("show_name", "show_year");

const VALID_PROPERTIES = ["show_name", "show_year", "show_description"];

function hasOnlyValidProperties(req, _res, next) {
  const { data = {} } = req.body;

  const invalidFields = Object.keys(data).filter(
    (field) => !VALID_PROPERTIES.includes(field),
  );

  if (invalidFields.length) {
    return next({
      status: 400,
      message: `Invalid field(s): ${invalidFields.join(", ")}`,
    });
  }
  next();
}

async function list(_req, res) {
  const data = await showsService.list();
  res.status(200).json({ data });
}

async function create(req, res) {
  const data = await showsService.create(req.body.data);
  res.status(201).json({ data });
}

async function showExists(req, res, next) {
  const show = await showsService.read(req.params.show_id);
  if (show) {
    res.locals.show = show;
    return next();
  }

  next({ status: 404, message: `Show cannot be found.` });
}

async function read(req, res) {
  const { show_id } = req.params;
  const data = await showsService.read(show_id);
  res.status(200).json({ data });
}

module.exports = {
  list: asyncErrorBoundary(list),
  create: [
    hasOnlyValidProperties,
    hasRequiredProperties,
    asyncErrorBoundary(create),
  ],
  read: [asyncErrorBoundary(showExists), asyncErrorBoundary(read)],
};
