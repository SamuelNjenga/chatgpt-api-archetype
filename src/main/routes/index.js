const Router = require("express");
const UserRoutes = require("./UserRoutes");
const RoomRoutes = require("./RoomRoutes");

const router = Router();

router.use("/users", UserRoutes);
router.use("/rooms", RoomRoutes);

module.exports = router;
