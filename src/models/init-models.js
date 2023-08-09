var DataTypes = require("sequelize").DataTypes;
var _StationLogs = require("./StationLogs");

function initModels(sequelize) {
  var StationLogs = _StationLogs(sequelize, DataTypes);

  return {
    StationLogs,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
