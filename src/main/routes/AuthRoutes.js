const Router = require("express");
const authController = require("../controllers/AuthController");

const router = Router();

router.post("/register", authController.registerAdmin);
router.post("/login", authController.login);
router.get("/", authController.getAdmins);
router.delete("/:id", authController.deleteAdmin);
router.put("/:id", authController.updateAdmin);

module.exports = router;
