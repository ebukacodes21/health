import {
    DataTypes,
    Model,
    InferAttributes,
    InferCreationAttributes,
    CreationOptional,
  } from '@sequelize/core';
  import { sequelize } from '../database/database.config';
  
  export class Consultation extends Model<
    InferAttributes<Consultation>, 
    InferCreationAttributes<Consultation>
  > {
    declare id: CreationOptional<number>; 
    declare patientId: number;
    declare type: string;
    declare appointmentDateTime: string;
    declare doctorName: string;
    declare status: 'pending' | 'completed' | 'cancelled'
  }

  export const ConsultationModel = sequelize.define<Consultation>('consultations', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true, 
    },
    patientId: {
        type: DataTypes.INTEGER,
        allowNull: false 
    },
    type: {
        type: DataTypes.STRING,
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
        type: DataTypes.ENUM("pending", "completed", "cancelled"),
        allowNull: false,
    },
  }, {
    timestamps: true,
  });
  
  