import {
    DataTypes,
    Model,
    InferAttributes,
    InferCreationAttributes,
    CreationOptional,
  } from '@sequelize/core';
  import { sequelize } from '../database/database.config';
  
  export class Patient extends Model<
    InferAttributes<Patient>, 
    InferCreationAttributes<Patient>
  > {
    declare id: CreationOptional<number>; 
    declare firstName: string;
    declare lastName: string;
    declare email: string;
    declare password: string;
    declare age: number;
    declare phone: string;
    declare role: "patient" | "admin"
  }

  export const privateFields = ["password"]

  export const PatientModel = sequelize.define<Patient>('patients', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true, 
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true, 
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM("patient", "admin"),
      allowNull: false,
    }
  }, {
    timestamps: true,
  });
  
  