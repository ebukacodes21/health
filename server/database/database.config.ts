import { Sequelize } from '@sequelize/core';
import { PostgresDialect } from '@sequelize/postgres';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

// postgres
const databaseName = process.env.POSTGRESQL_DATABASE_NAME!;
const databaseUser = process.env.POSTGRESQL_DATABASE_USER!;
const databasePassword = process.env.POSTGRESQL_DATABASE_PASSWORD!;
const host = process.env.POSTGRESQL_DATABASE_HOST!;
const port = process.env.POSTGRESQL_DATABASE_PORT!;

// mongodb
const mongoUser = process.env.MONGO_INITDB_ROOT_USERNAME!;
const mongoPassword = process.env.MONGO_INITDB_ROOT_PASSWORD!;
const mongoName = process.env.MONGO_INITDB_DATABASE!;
const mongoHost = process.env.MONGO_DATABASE_HOST!;
const mongoPort = process.env.MONGO_DATABASE_PORT!;

// posgres connection
export const sequelize = new Sequelize({
  dialect: PostgresDialect,
  database: databaseName,
  user: databaseUser,  
  password: databasePassword, 
  host, 
  port: Number(port),  
  ssl: false,  
  clientMinMessages: 'notice',
});

// MongoDB connection
const uri = `mongodb://${mongoUser}:${mongoPassword}@${mongoHost}:${mongoPort}/${mongoName}?authSource=admin`;
export const connectMongo = async () => {
  try {
    await mongoose.connect(uri);
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
    throw error;
  }
};