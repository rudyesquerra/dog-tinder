'use strict'
var SequelizeMock = require('sequelize-mock')
var dbMock = new SequelizeMock()

module.exports = function(sequelize, DataTypes){
  return dbMock.define('Dog', {
    name: 'Paws',
    age: 4,
    enjoys: 'Long walks on the beach.'
  })
}
