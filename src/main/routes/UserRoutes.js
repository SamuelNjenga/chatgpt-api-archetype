const Router = require("express");

const userController = require("../controllers/UserController");

const router = Router();

/**
 * @swagger
 * components:
 *  schemas:
 *   User:
 *    type: object
 *    required:
 *     - name
 *    properties:
 *     id:
 *      type: integer
 *      description: The auto-generated id of the user
 *     name:
 *      type: string
 *      description: The name of user
 *    example:
 *     id: 1
 *     name: Sam Njenga
 */

/**
 * @swagger
 * tags:
 *  name: Users
 *  description: The users managing API
 */

router.post("/", userController.createUser);
router.get("/", userController.getUsers);
router.delete("/:id", userController.deleteUser);
router.put("/:id", userController.updateUser);

module.exports = router;
