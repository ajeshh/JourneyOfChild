"use strict";

module.exports = function(sequelize, DataTypes) {
  var contact = sequelize.define("contact", {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    message: DataTypes.TEXT
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });

  return contact;
};
