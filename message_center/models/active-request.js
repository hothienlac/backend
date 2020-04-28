'use strict';
module.exports = (sequelize, DataTypes) => {
  const ActiveRequest = sequelize.define('ActiveRequest', {
    sid: DataTypes.STRING,
    begin: DataTypes.DATE,
    end: DataTypes.DATE,
    reason: DataTypes.TEXT
  }, {});
  ActiveRequest.associate = function(models) {
    // associations can be defined here
  };
  return ActiveRequest;
};