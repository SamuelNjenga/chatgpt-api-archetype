const Router = require("express");
const authController = require("../controllers/AuthController");

const router = Router();

/**
 * @swagger
 * components:
 *  schemas:
 *   Admin:
 *    type: object
 *    required:
 *     - firstName
 *     - lastName
 *     - email
 *     - password
 *    properties:
 *     id:
 *      type: integer
 *      description: The auto-generated id of the admin
 *     firstName:
 *      type: string
 *      description: The admin's first name
 *     lastName:
 *      type: string
 *      description: The admin's last name
 *     email:
 *      type: string
 *      description: The admin's email
 *     password:
 *      type: string
 *      description: The admin's password 
 *    example:
 *     id: 1
 *     firstName: Sam
 *     lastName: Njenga
 *     email: sam@gmail.com
 *     password: 12345.
 *  requestBodies:
 *   AdminBody:
 *    description: A JSON object containing admin information
 *    required: true
 *    content:
 *      application/json:
 *        schema:
 *         type: object
 *         properties:
 *          firstName:
 *           type: string
 *          lastName:
 *           type: string
 *          email:
 *           type: string
 *          password:
 *           type: string
 *        examples:
 *         Sam:
 *          value:
 *           firstName: Sam
 *           lastName: Njenga
 *           email: sam@gmail.com
 *           password: 12345.
 *         Ivy:
 *          value:
 *           firstName: Ivy
 *           lastName: Wanjiku
 *           email: ivy@gmail.com
 *           password: 92345$5%
 */

/**
 * @swagger
 * tags:
 *  name: Admins
 *  description: The admins managing API
 */
router.post("/register", authController.registerAdmin);
router.post("/login", authController.login);
router.get("/", authController.getAdmins);
router.delete("/:id", authController.deleteAdmin);
router.put("/:id", authController.updateAdmin);

module.exports = router;
