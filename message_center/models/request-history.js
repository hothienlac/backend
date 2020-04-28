'use strict';
module.exports = (sequelize, DataTypes) => {
  const RequestHistory = sequelize.define('RequestHistory', {
    sid: DataTypes.STRING,
    begin: DataTypes.DATE,
    end: DataTypes.DATE,
    reason: DataTypes.TEXT,
    timeStamp: DataTypes.DATE,
    accepted: DataTypes.BOOLEAN
  }, {});
  RequestHistory.associate = function(models) {
    // associations can be defined here
  };
  return RequestHistory;
};