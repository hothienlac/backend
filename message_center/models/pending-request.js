'use strict';

module.exports = (sequelize, DataTypes) => {
  const PendingRequest = sequelize.define('PendingRequest', {
    sid: DataTypes.STRING,
    date: DataTypes.DATE,
    begin: DataTypes.TIME,
    end: DataTypes.TIME,
    reason: DataTypes.TEXT
  }, {});
  PendingRequest.associate = function(models) {
    // associations can be defined here
  };
  return PendingRequest;
};