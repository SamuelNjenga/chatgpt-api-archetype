const ReqValidator = require("../utils/validator");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const authService = require("../services/AuthService");
const { sequelize } = require("../db/models/index");

async function hashPassword(password) {
  return await bcrypt.hash(password, 10);
}

exports.registerAdmin = async (req, res, next) => {
  const transaction = await sequelize.transaction();
  try {
    const valid = await ReqValidator.validate(req, res, {
      firstName: "string",
      lastName: "string",
      email: "string|email",
      password: "string",
    });
    if (!valid) return;
    const data = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
    };
    let admin = await authService.getAdmin({
      where: {
        email: data.email,
      },
      transaction,
    });
    if (admin) {
      throw new Error("Email already exists");
    }
    const hashedPassword = await hashPassword(data.password);
    const newAdmin = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: hashedPassword,
    };
    await authService.registerAdmin(newAdmin, transaction);
    await transaction.commit();
    res.status(201).json(newAdmin);
  } catch (err) {
    transaction.rollback();
    next(err);
  }
};

exports.updateAdmin = async (req, res, next) => {
  const transaction = await sequelize.transaction();
  try {
    const valid = await ReqValidator.validate(req, res, {
      firstName: "string",
      lastName: "string",
      email: "string|email",
      // password: 'string',
    });
    if (!valid) return;
    const data = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      // password: req.body.password,
    };
    const newAdmin = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      // password: hashedPassword,
    };
    const adminId = req.params.id;
    await authService.updateAdmin(newAdmin, {
      where: {
        id: adminId,
      },
      transaction,
    });
    await transaction.commit();
    res.status(200).json(data);
  } catch (err) {
    transaction.rollback();
    next(err);
    //console.log(err)
  }
};

exports.deleteAdmin = async (req, res, next) => {
  try {
    const adminId = req.params.id;
    await authService.deleteAdmin({
      where: {
        id: adminId,
      },
    });
    res.status(200).json({
      data: null,
      message: `Admin ${adminId} has been deleted`,
    });
  } catch (error) {
    next(error);
  }
};

exports.getAdmins = async (req, res, next) => {
  try {
    const admins = await authService.getAdmins();
    res.status(200).json(admins);
  } catch (err) {
    res.json({
      message: err,
    });
    next(err);
  }
};

async function validatePassword(plainPassword, hashedPassword) {
  return await bcrypt.compare(plainPassword, hashedPassword);
}

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const admin = await authService.getAdmin({
      where: {
        email: email,
      },
    });
    if (!admin) return next(new Error("Email does not exist"));
    const validPassword = await validatePassword(password, admin.password);
    if (!validPassword) return next(new Error("Password is not correct"));
    const accessToken = jwt.sign(
      {
        adminId: admin.id,
      },
      process.env.JWT_SECRET
      // {
      //   expiresIn: '1d'
      // }
    );
    await authService.updateAdmin(accessToken, {
      where: {
        id: admin.id,
      },
    });
    res.status(200).json({
      data: {
        email: admin.email,
        firstName: admin.firstName,
        id: admin.id,
      },
      accessToken,
    });
  } catch (error) {
    res.status(401).json({
      message: "Incorrect Credentials",
    });
    next(error);
  }
};

exports.getAdminByPk = async (req, res, next) => {
  try {
    const admin = await authService.getAdminByPk(req.params.id);
    res.status(200).json(admin);
  } catch (err) {
    res.json({
      message: err,
    });
    next(err);
  }
};
