import {
    DataTypes,
    Model,
    InferAttributes,
    InferCreationAttributes,
    CreationOptional,
  } from '@sequelize/core';
  import { sequelize } from '../database/database.config';
  import { v4 } from 'uuid'
  
  export class HealthTest extends Model<
    InferAttributes<HealthTest>, 
    InferCreationAttributes<HealthTest>
  > {
    declare id: CreationOptional<number>; 
    declare type: string;
    declare description: string;
    declare code: string;
    declare facility: string
  }

  export const HealthTestModel = sequelize.define<HealthTest>('health_tests', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true, 
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    code: {
        type: DataTypes.UUID,
        allowNull: false,
        defaultValue: v4()
      },
    facility: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    timestamps: true,
  });
  
  