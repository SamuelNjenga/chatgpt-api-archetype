const { sequelize } = require("../db/models");

const messageService = require("../services/MessageService");

const ReqValidator = require("../utils/validator");

exports.createMessage = async (req, res, next) => {
  const transaction = await sequelize.transaction();
  try {
    const valid = await ReqValidator.validate(req, res, {
      message: "required|string",
      roomId: "required|integer",
      userId: "required|integer",
    });
    if (!valid) return;
    const data = {
      message: req.body.message,
      roomId: req.body.roomId,
      userId: req.body.userId,
    };

    await messageService.createMessage(data, transaction);
    await transaction.commit();
    res.status(201).json({ data, message: `A new message has been created` });
  } catch (err) {
    transaction.rollback();
    next(err);
  }
};

exports.getMessages = async (req, res, next) => {
  try {
    const messages = await messageService.getMessages();
    res.status(200).json(messages);
  } catch (err) {
    res.json({
      message: err,
    });
    next(err);
  }
};

exports.updateMessage = async (req, res, next) => {
  const transaction = await sequelize.transaction();
  try {
    const valid = await ReqValidator.validate(req, res, {
      message: "string",
      roomId: "integer",
      userId: "integer",
    });
    if (!valid) return;
    const data = {
      message: req.body.message,
      roomId: req.body.roomId,
      userId: req.body.userId,
    };

    const messageId = req.params.id;

    const message = await messageService.getMessage(messageId);

    if (!message) {
      await transaction.commit();
      return res.status(200).json({
        message: `Message ${messageId} does not exist in our database`,
      });
    }

    await messageService.updateMessage(
      data,
      {
        where: {
          id: messageId,
        },
      },
      transaction
    );
    await transaction.commit();
    res
      .status(200)
      .json({ data, message: `Message ${messageId} has been updated` });
  } catch (err) {
    transaction.rollback();
    next(err);
  }
};

exports.deleteMessage = async (req, res, next) => {
  const transaction = await sequelize.transaction();
  try {
    const messageId = req.params.id;

    const message = await messageService.getMessage(messageId);

    if (!message) {
      await transaction.commit();
      return res.status(200).json({
        message: `Message ${messageId} does not exist in our database`,
      });
    }

    await messageService.deleteMessage(
      {
        where: {
          id: messageId,
        },
      },
      transaction
    );
    await transaction.commit();
    res.status(200).json({
      message: `Message ${messageId} has been deleted`,
    });
  } catch (error) {
    transaction.rollback();
    next(error);
  }
};
