'use strict';
const {
  Model
} = require('sequelize');
const bcrypt = require('bcryptjs')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Note, {
        foreignKey: 'UserId'
      })
    }
  };
  User.init({
    email: {
      type: DataTypes.STRING,
      unique: {
        args : true,
        msg : 'Email already exist'
      },
      validate : {
        isEmail : {
          args: true,
          msg : "Check your email format"
        }
      }
    },
    password: DataTypes.STRING,
  }, {
    hooks:{
      beforeCreate(User){
        const salt = bcrypt.genSaltSync(+process.env.SALT)
        User.password = bcrypt.hashSync(User.password, salt)
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};