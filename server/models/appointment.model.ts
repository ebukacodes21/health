import {
    DataTypes,
    Model,
    InferAttributes,
    InferCreationAttributes,
    CreationOptional,
  } from '@sequelize/core';
  import { sequelize } from '../database/database.config';
  
  export class Appointment extends Model<
    InferAttributes<Appointment>, 
    InferCreationAttributes<Appointment>
  > {
    declare id: CreationOptional<number>; 
    declare patientId: number;
    declare testId: number;
    declare appointmentDateTime: string;
    declare doctorName: string;
    declare status: 'booked' | 'completed' | 'cancelled'
  }

  export const AppointmentModel = sequelize.define<Appointment>('appointments', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true, 
    },
    patientId: {
        type: DataTypes.INTEGER,
        allowNull: false 
    },
    testId: {
        type: DataTypes.INTEGER,
        allowNull: false 
    },
    appointmentDateTime: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    doctorName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    status: {
        type: DataTypes.ENUM("booked", "completed", "cancelled"),
        allowNull: false,
    },
  }, {
    timestamps: true,
  });
  
  