import "dotenv/config";
import LoggerEmitter from "./LoggerEmitter.js";
import { consoleLogHandler } from "./consoleLogHandler.js";
import { fileLogHandler } from "./fileLogHandler.js";
const loggerEmitter = new LoggerEmitter();
loggerEmitter.on("message", consoleLogHandler);
loggerEmitter.on("message", fileLogHandler);
loggerEmitter.log("Hello World!");
