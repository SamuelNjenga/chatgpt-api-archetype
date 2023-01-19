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

/**
 * @swagger
 * /auths/register:
 *   post:
 *     summary: Register a new admin
 *     tags: [Admins]
 *     requestBody:
 *      $ref: '#/components/requestBodies/AdminBody'
 *     responses:
 *        201:
 *          description: The admin was successfully created
 *          content:
 *            application/json:
 *               schema:
 *                  $ref: '#/components/schemas/Admin'
 *        500:
 *           description: Some server error
 */
router.post("/register", authController.registerAdmin);

/**
 * @swagger
 * /auths/login:
 *   post:
 *     summary: Log in an admin
 *     tags: [Admins]
 *     requestBody:
 *      description: A JSON object containing login information
 *      required: true
 *      content:
 *       application/json:
 *        schema:
 *         type: object
 *         properties:
 *          email:
 *           type: string
 *          password:
 *           type: string
 *     responses:
 *        200:
 *          description: The admin logged in successfully
 *          content:
 *            application/json:
 *               schema:
 *                type: object
 *               properties:
 *                email: string
 *                firstName: string
 *                id: integer
 *                accessToken: string
 *               example:
 *                data:
 *                 email: sam@gmail.com
 *                 password: 12%3$8
 *                 id: 4
 *                accessToken: token value
 *        500:
 *           description: Some server error
 */

router.post("/login", authController.login);
router.get("/", authController.getAdmins);
router.delete("/:id", authController.deleteAdmin);
router.put("/:id", authController.updateAdmin);

module.exports = router;
