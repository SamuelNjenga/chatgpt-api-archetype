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

/**
 * @swagger
 * /auths:
 *  get:
 *   summary: Returns the list of all the admins
 *   description: This resource returns a list of all the admins in the system.
 *   tags: [Admins]
 *   responses:
 *    200:
 *     description: The list of the admins
 *     content:
 *      application/json:
 *       schema:
 *        type: array
 *        items:
 *         $ref: '#/components/schemas/Admin'
 */
router.get("/", authController.getAdmins);

/**
 * @swagger
 * /auths/{id}:
 *  put:
 *   summary: Update the admin by the id
 *   tags: [Admins]
 *   parameters:
 *    - in: path
 *      name: id
 *      schema:
 *       type: integer
 *       example: 2
 *      required: true
 *      description: The admin id
 *   requestBody:
 *    $ref: '#/components/requestBodies/AdminBody'
 *   responses:
 *     200:
 *      description: The admin has been updated
 *      content:
 *       application/json:
 *        schema:
 *         $ref: '#/components/schemas/Admin'
 *     404:
 *      description: The admin was not found
 *     500:
 *      description: Some error happened
 *  delete:
 *   summary: Remove the admin by id
 *   description: >
 *    This resource represents a delete operation for an admin **in** the system.
 *    Each admin to be deleted **is** identified **by** a numeric**`id`**.
 *   tags: [Admins]
 *   parameters:
 *    - in: path
 *      name: id
 *      schema:
 *       type: integer
 *       example: 2
 *      required: true
 *      description: The admin id
 *   responses:
 *     200:
 *      description: The admin was deleted
 *     404:
 *      description: The admin was not found
 */
router.delete("/:id", authController.deleteAdmin);
router.put("/:id", authController.updateAdmin);

module.exports = router;
