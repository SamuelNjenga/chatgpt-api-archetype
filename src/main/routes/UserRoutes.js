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

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *               type: object
 *               properties:
 *                name:
 *                 type: string
 *            example:
 *             name: Samuel Njenga
 *     responses:
 *        201:
 *          description: The user was successfully created
 *          content:
 *            application/json:
 *               schema:
 *                  $ref: '#/components/schemas/User'
 *        500:
 *           description: Some server error
 */
router.post("/", userController.createUser);
/**
 * @swagger
 * /users:
 *  get:
 *   summary: Returns the list of all the users
 *   tags: [Users]
 *   responses:
 *    200:
 *     description: The list of the users
 *     content:
 *      application/json:
 *       schema:
 *        type: array
 *        items:
 *         $ref: '#/components/schemas/User'
 */
router.get("/", userController.getUsers);

/**
 * @swagger
 * /users/{id}:
 *  delete:
 *   summary: Remove the user by id
 *   tags: [Users]
 *   parameters:
 *    - in: path
 *      name: id
 *      schema:
 *       type: integer
 *      required: true
 *      description: The user id
 *   responses:
 *     200:
 *      description: The user was deleted
 *     404:
 *      description: The user was not found
 */
router.delete("/:id", userController.deleteUser);

/**
 * @swagger
 * /users/{id}:
 *  put:
 *   summary: Update the user by the id
 *   tags: [Users]
 *   parameters:
 *    - in: path
 *      name: id
 *      schema:
 *       type: integer
 *      required: true
 *      description: The user id
 *   requestBody:
 *     required: true
 *     content:
 *      application/json:
 *       schema:
 *        type: object
 *        properties:
 *         name:
 *           type: string
 *        example: 
 *         name: Samuel Njenga
 *   responses:
 *     200:
 *      description: The user was updated
 *      content:
 *       application/json:
 *        schema:
 *         $ref: '#/components/schemas/User'
 *     404:
 *      description: The user was not found
 *     500:
 *      description: Some error happened
 */
router.put("/:id", userController.updateUser);

module.exports = router;
