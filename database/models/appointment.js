'use strict';
const {
  Model
} = require('sequelize');
const Doctor = require('./doctor');
const Patient = require('./patient');
module.exports = (sequelize, DataTypes) => {
  class Appointment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Appointment.belongsTo(models.Doctor, {
        foreignKey: 'doctorId'
      })
      Appointment.belongsTo(models.Patient, {
        foreignKey: 'patientId'
      })
    }
  }
  Appointment.init({
    date: DataTypes.DATE,
    doctorId:{ 
      type: DataTypes.INTEGER,
      references: {
        model: Doctor,
        key: 'id'
      }
    },
    patientId: {
      type: DataTypes.INTEGER,
      references: {
        model: Patient,
        key: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'Appointment',
  });
  return Appointment;
};