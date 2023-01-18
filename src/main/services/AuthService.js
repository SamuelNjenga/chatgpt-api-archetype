const db = require("../db/models/index");

exports.registerAdmin = async (data) => {
  return db.Admin.create(data);
};

exports.updateAdmin = async (data, root) => {
  return db.Admin.update(data, root);
};

exports.getAdmins = async () => {
  return db.Admin.findAll();
};

exports.getAdmin = async (data) => {
  return db.Admin.findOne(data);
};

exports.getAdminByPk = async (data) => {
  return db.Admin.findByPk(data);
};

exports.deleteAdmin = async (data) => {
  return db.Admin.destroy(data);
};