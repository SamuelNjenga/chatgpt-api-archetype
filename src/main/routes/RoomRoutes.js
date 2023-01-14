const Router = require("express");

const roomController = require("../controllers/RoomController");

const router = Router();

/**
 * @swagger
 * components:
 *  schemas:
 *   Room:
 *    type: object
 *    required:
 *     - name
 *    properties:
 *     id:
 *      type: integer
 *      description: The auto-generated id of the room
 *     name:
 *      type: string
 *      description: The name of room
 *    example:
 *     id: 1
 *     name: Express JS Discussion
 */

/**
 * @swagger
 * tags:
 *  name: Rooms
 *  description: The rooms managing API
 */

/**
 * @swagger
 * /rooms:
 *   post:
 *     summary: Create a new room
 *     tags: [Rooms]
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
 *             name: The Express JS Room
 *     responses:
 *        201:
 *          description: The room was successfully added
 *          content:
 *            application/json:
 *               schema:
 *                  $ref: '#/components/schemas/Room'
 *        500:
 *           description: Some server error
 */
router.post("/", roomController.createRoom);
/**
 * @swagger
 * /rooms:
 *  get:
 *   summary: Returns the list of all the rooms
 *   tags: [Rooms]
 *   responses:
 *    200:
 *     description: The list of the rooms
 *     content:
 *      application/json:
 *       schema:
 *        type: array
 *        items:
 *         $ref: '#/components/schemas/Room'
 */
router.get("/", roomController.getRooms);

/**
 * @swagger
 * /rooms/{id}:
 *  delete:
 *   summary: Remove the room by id
 *   tags: [Rooms]
 *   parameters:
 *    - in: path
 *      name: id
 *      schema:
 *       type: integer
 *      required: true
 *      description: The room id
 *   responses:
 *     200:
 *      description: The room was deleted
 *     404:
 *      description: The room was not found
 */
router.delete("/:id", roomController.deleteroom);

/**
 * @swagger
 * /rooms/{id}:
 *  put:
 *   summary: Update the room by the id
 *   tags: [Rooms]
 *   parameters:
 *    - in: path
 *      name: id
 *      schema:
 *       type: integer
 *      required: true
 *      description: The room id
 *   requestBody:
 *     required: true
 *     content:
 *      application/json:
 *       schema:
 *        type: object
 *        properties:
 *         name:
 *           type: string
 *       example:
 *        name: The Express JS Room
 *   responses:
 *     200:
 *      description: The room was updated
 *      content:
 *       application/json:
 *        schema:
 *         $ref: '#/components/schemas/Room'
 *     404:
 *      description: The room was not found
 *     500:
 *      description: Some error happened
 */
router.put("/:id", roomController.updateRoom);

module.exports = router;
