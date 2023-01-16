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
 *  requestBodies:
 *   RoomBody:
 *    description: A JSON object containing room information
 *    required: true
 *    content:
 *      application/json:
 *        schema:
 *         type: object
 *         properties:
 *          name:
 *           type: string
 *        example:
 *         name: The Express JS Room
 *
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
 *      $ref: '#/components/requestBodies/RoomBody'
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
 *   description: This resource returns a list of all the rooms in the system.
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
 *      application/xml:
 *       schema:
 *        type: array
 *        items:
 *         $ref: '#/components/schemas/Room'
 */
router.get("/", roomController.getRooms);

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
 *       example: 2
 *      required: true
 *      description: The room id
 *   requestBody:
 *    $ref: '#/components/requestBodies/RoomBody'
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
 *  delete:
 *   summary: Remove the room by id
 *   description: >
 *    This resource represents a delete operation for a room **in** the system.
 *    Each room to be deleted **is** identified **by** a numeric**`id`**.
 *   tags: [Rooms]
 *   parameters:
 *    - in: path
 *      name: id
 *      schema:
 *       type: integer
 *       example: 2
 *      required: true
 *      description: The room id
 *   responses:
 *     200:
 *      description: The room was deleted
 *     404:
 *      description: The room was not found
 */
router.put("/:id", roomController.updateRoom);
router.delete("/:id", roomController.deleteroom);

module.exports = router;
