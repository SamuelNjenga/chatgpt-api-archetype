const Router = require("express");
const UserRoutes = require("./UserRoutes");
const RoomRoutes = require("./RoomRoutes");
const MessageRoutes = require("./MessageRoutes");

const router = Router();

router.use("/users", UserRoutes);
router.use("/rooms", RoomRoutes);
router.use("/messages", MessageRoutes);

module.exports = router;
