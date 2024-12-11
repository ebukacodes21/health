import { Sequelize } from '@sequelize/core';
import { PostgresDialect } from '@sequelize/postgres';
import config from 'config'
import mongoose from 'mongoose';

// postgresql auth
const databaseName = config.get<string>("databaseName")
const databaseUser = config.get<string>("databaseUser")
const databasePassword = config.get<string>("databasePassword")
const host = config.get<string>("databaseHost")
const port = config.get<number>("databasePort")

// mongo
const mongoUser = config.get<string>("mongoUser")
const mongoPassword = config.get<string>("mongoPassword") 
const mongoName = config.get<string>("mongoName") 
const mongoHost = config.get<string>("mongoHost") 
const mongoPort = config.get<string>("mongoPort") 

export const sequelize = new Sequelize({
    dialect: PostgresDialect,
    database: databaseName,
    user: databaseUser,
    password: databasePassword,
    host,
    port,
    ssl: false,
    clientMinMessages: 'notice',
  });

const uri = `mongodb://${mongoUser}:${mongoPassword}@${mongoHost}:${mongoPort}/${mongoName}?authSource=admin`
export const connectMongo = async () => {
  try {
    await mongoose.connect(uri)
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
    throw error; 
  }
};