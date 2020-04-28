'use strict';
module.exports = (sequelize, DataTypes) => {
  const RequestHistory = sequelize.define('RequestHistory', {
    sid: DataTypes.STRING,
    date: DataTypes.DATE,
    begin: DataTypes.TIME,
    end: DataTypes.TIME,
    reason: DataTypes.TEXT,
    accepted: DataTypes.BOOLEAN
  }, {});
  RequestHistory.associate = function(models) {
    // associations can be defined here
  };
  return RequestHistory;
};