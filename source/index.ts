import "reflect-metadata";
import { client } from "./client";
require("dotenv").config();

client.init().catch((err: any) => {
  client.ILogger.error(`[3]${err}`);
  console.error(err);
});