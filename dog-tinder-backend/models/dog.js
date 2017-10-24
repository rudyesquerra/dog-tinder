'use strict';
module.exports = (sequelize, DataTypes) => {
  var Dog = sequelize.define('Dog', {
    name: DataTypes.STRING,
    age: DataTypes.INTEGER,
    enjoys: DataTypes.TEXT
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Dog;
};