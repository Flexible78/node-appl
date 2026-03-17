import "dotenv/config";
import logger from "./logger.js";
import LoggerEmitter from "./LoggerEmitter.js";
import { consoleHandler } from "./consoleLogHandler.js";
import { fileHandler } from "./fileLogHandler.js";
const loggerEmitter = new LoggerEmitter([consoleHandler, fileHandler]);
const messages: string[] = ["Hello world", "What's up", "How are you", "Bye"]
messages.forEach(m => loggerEmitter.log(m))
