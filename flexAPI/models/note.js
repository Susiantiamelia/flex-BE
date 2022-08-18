'use strict';
const {
  Model
} = require('sequelize');
const bcrypt = require('bcryptjs')
module.exports = (sequelize, DataTypes) => {
  class Note extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Note.belongsTo(models.User)
    }
  };
  Note.init({
    id: {
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        type: DataTypes.INTEGER
      },
      UserId: DataTypes.INTEGER,
      notes: DataTypes.STRING,
      status: DataTypes.STRING,
      mood: DataTypes.STRING
  }, {
    hooks:{},
    sequelize,
    modelName: 'Note',
  });
  return Note;
};