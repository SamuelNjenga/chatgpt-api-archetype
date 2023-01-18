const Router = require("express");
const UserRoutes = require("./UserRoutes");
const RoomRoutes = require("./RoomRoutes");
const MessageRoutes = require("./MessageRoutes");
const AuthRoutes = require("./AuthRoutes");

const router = Router();

router.use("/users", UserRoutes);
router.use("/auths", AuthRoutes);
router.use("/rooms", RoomRoutes);
router.use("/messages", MessageRoutes);

module.exports = router;
