const { sequelize } = require("../db/models");
const db = require("../db/models");

const roomService = require("../services/RoomService");

const ReqValidator = require("../utils/validator");

exports.createRoom = async (req, res, next) => {
  const transaction = await sequelize.transaction();
  try {
    const valid = await ReqValidator.validate(req, res, {
      name: "required|string",
    });
    if (!valid) return;
    const data = {
      name: req.body.name,
    };
    await roomService.createRoom(data, transaction);
    await transaction.commit();
    res.status(201).json({ data, message: `A new room has been added` });
  } catch (err) {
    transaction.rollback();
    next(err);
  }
};

exports.getRooms = async (req, res, next) => {
  try {
    const rooms = await roomService.getRooms();
    res.status(200).json(rooms);
  } catch (err) {
    res.json({
      message: err,
    });
    next(err);
  }
};

exports.updateRoom = async (req, res, next) => {
  const transaction = await sequelize.transaction();
  try {
    const valid = await ReqValidator.validate(req, res, {
      name: "required|string",
    });
    if (!valid) return;
    const data = {
      name: req.body.name,
    };

    const roomId = req.params.id;

    const room = await roomService.getRoom(roomId);

    if (!room) {
      await transaction.commit();
      return res.status(404).json({
        message: `Room ${roomId} does not exist in our database`,
      });
    }

    await roomService.updateRoom(
      data,
      {
        where: {
          id: roomId,
        },
      },
      transaction
    );
    await transaction.commit();
    res.status(200).json({ data, message: `Room ${roomId} has been updated` });
  } catch (err) {
    transaction.rollback();
    next(err);
  }
};

exports.deleteroom = async (req, res, next) => {
  const transaction = await sequelize.transaction();
  try {
    const roomId = req.params.id;

    const room = await roomService.getRoom(roomId);

    if (!room) {
      await transaction.commit();
      return res.status(404).json({
        message: `Room ${roomId} does not exist in our database`,
      });
    }

    await roomService.deleteRoom(
      {
        where: {
          id: roomId,
        },
      },
      transaction
    );
    await transaction.commit();
    res.status(200).json({
      message: `Room ${roomId} has been deleted`,
    });
  } catch (error) {
    transaction.rollback();
    next(error);
  }
};
