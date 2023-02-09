import * as dotenv from 'dotenv'
import { DataSource } from "typeorm";
import { Post } from "./entitites/Post";
import { User } from "./entitites/User";
import path from "path";
import { Ride } from './entitites/Ride';
import { Message } from './entitites/Message';
dotenv.config();

export const __prod__ = process.env["NODE_ENV"] === "production";
export const dbName = process.env["DB_NAME"];
export const dbPass = process.env["DB_PASSWORD"];
export const secret: string | string[] =
  process.env["SECRET"] || "keyboard cat";
export const COOKIE_NAME: string = process.env["COOKIE_NAME"] || "qid";
export const FORGET_PASSWORD_PREFIX = "forget-password:";
export const dataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: dbPass,
  database: dbName,
  logging: true,
  migrations: [path.join(__dirname, "./migrations/*")],
  synchronize: true,
  entities: [User, Post, Ride, Message],
});