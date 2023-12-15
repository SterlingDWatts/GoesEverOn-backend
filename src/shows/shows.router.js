const router = require("express").Router({ mergeParams: true });
const controller = require("./shows.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

router.route("/").get(controller.list);
router.route("/").post(controller.create).all(methodNotAllowed);
router.route("/:show_id").get(controller.read).all(methodNotAllowed);

module.exports = router;
