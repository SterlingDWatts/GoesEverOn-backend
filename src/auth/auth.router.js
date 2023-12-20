const router = require("express").Router({ mergeParams: true });
const controller = require("./auth.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

router.route("/login").post(controller.validate).all(methodNotAllowed);

module.exports = router;
