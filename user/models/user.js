"use strict";
module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define(
    "user",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
      },
      role: {
        type: DataTypes.ENUM(
          'ADMIN',
          'MANAGER',
          'STUDENT',
          'PARENT',
          'UNIVERSITY',
          'STAFF',
          'GUEST',
        ),
        allowNull: false,
      },
      telegram: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        primaryKey: true,
      },
    },
    {}
  );
  user.associate = function (models) {
    models.user.belongsToMany(models.user, {
      through: "children_parents",
      as: "parents",
      foreignKey: "childrenId",
    });
    models.user.belongsToMany(models.user, {
      through: "children_parents",
      as: "children",
      foreignKey: "parentsId",
    });
  };
  return user;
};
