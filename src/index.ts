import "dotenv/config";
import logger from "./logger.js";
import LoggerEmitter from "./LoggerEmitter.js";
import { consoleLogHandler } from "./consoleLogHandler.js";
import { fileLogHandler } from "./fileLogHandler.js";

const loggerEmitter = new LoggerEmitter([consoleLogHandler, fileLogHandler]);

const messages: string[] = ["Hello world", "What's up", "How are you", "Bye"];

messages.forEach(m => loggerEmitter.log(m));
