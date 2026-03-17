import "dotenv/config";
import logger from "./logger.js";
import LoggerEmitter from "./LoggerEmitter.js";
import { consoleHandler } from "./consoleLogHandler.js";
import { fileHandler } from "./fileLogHandler.js";
const loggerEmitter = new LoggerEmitter();
loggerEmitter.on("message", consoleHandler)
loggerEmitter.on("message", fileHandler)
loggerEmitter.log("kukureku")
