import "dotenv/config";
import logger from "./logger.js";
import LoggerEmitter from "./LoggerEmitter.js";
import ConsoleHandler from "./consoleLogHandler.js";
import FileHandler from "./fileLogHandler.js";
const loggerEmitter = new LoggerEmitter([new ConsoleHandler(), new FileHandler("logs.txt")]);
const messages: string[] = ["Hello world", "What's up", "How are you", "Bye"]
messages.forEach(m => loggerEmitter.log(m))
