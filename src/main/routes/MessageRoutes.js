const Router = require("express");

const messageController = require("../controllers/MessageController");

const router = Router();

/**
 * @swagger
 * components:
 *  schemas:
 *   Message:
 *    type: object
 *    required:
 *     - message
 *     - roomId
 *     - userId
 *    properties:
 *     id:
 *      type: integer
 *      description: The auto-generated id of the room
 *     message:
 *      type: string
 *      description: The message content
 *     roomId:
 *      type: integer
 *      description: The id of the room
 *     userId:
 *      type: integer
 *      description: The id of the user
 *    example:
 *     id: 1
 *     message: How can I rate limit in Express Js?
 *     userId: 2
 *     roomId: 3
 *  requestBodies:
 *   MessageBody:
 *    description: A JSON object containing message information
 *    required: true
 *    content:
 *      application/json:
 *        schema:
 *         type: object
 *         properties:
 *          message:
 *           type: string
 *          roomId:
 *           type: integer
 *          userId:
 *           type: integer
 *        example:
 *         message: How do I rate limit in Express JS?
 *         roomId: 2
 *         userId: 1
 */

/**
 * @swagger
 * tags:
 *  name: Messages
 *  description: The messages managing API
 */

/**
 * @swagger
 * /messages:
 *   post:
 *     summary: Create a new message
 *     tags: [Messages]
 *     requestBody:
 *      $ref: '#/components/requestBodies/MessageBody'
 *     responses:
 *        201:
 *          description: The message was successfully created
 *          content:
 *            application/json:
 *               schema:
 *                  $ref: '#/components/schemas/Message'
 *        500:
 *           description: Some server error
 */
router.post("/", messageController.createMessage);
/**
 * @swagger
 * /messages:
 *  get:
 *   summary: Returns the list of all the messages
 *   description: This resource returns a list of all the messages in the system.
 *   tags: [Messages]
 *   responses:
 *    200:
 *     description: The list of the messages
 *     content:
 *      application/json:
 *       schema:
 *        type: array
 *        items:
 *         $ref: '#/components/schemas/Message'
 */
router.get("/", messageController.getMessages);

/**
 * @swagger
 * /messages/{id}:
 *  delete:
 *   summary: Remove the message by id
 *   tags: [Messages]
 *   parameters:
 *    - in: path
 *      name: id
 *      schema:
 *       type: integer
 *      required: true
 *      description: The message id
 *   responses:
 *     200:
 *      description: The message was deleted
 *     404:
 *      description: The message was not found
 */
router.delete("/:id", messageController.deleteMessage);

/**
 * @swagger
 * /messages/{id}:
 *  put:
 *   summary: Update the message by the id
 *   tags: [Messages]
 *   parameters:
 *    - in: path
 *      name: id
 *      schema:
 *       type: integer
 *      required: true
 *      description: The message id
 *   requestBody:
 *    $ref: '#/components/requestBodies/MessageBody'
 *   responses:
 *     200:
 *      description: The message was updated
 *      content:
 *       application/json:
 *        schema:
 *         $ref: '#/components/schemas/Message'
 *     404:
 *      description: The message was not found
 *     500:
 *      description: Some error happened
 */
router.put("/:id", messageController.updateMessage);

module.exports = router;
