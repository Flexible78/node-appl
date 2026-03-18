import "dotenv/config";
import LoggerEmitter from "./LoggerEmitter.js";
import type { LoggerLevel } from "./LoggerLevel.js";
import ConsoleHandler from "./consoleLogHandler.js";
import FileHandler from "./fileLogHandler.js";
import TimeFormatter from "./TimeFormatter.js";

const formatter = new TimeFormatter("EST");
const loggerEmitter = new LoggerEmitter([
    new ConsoleHandler(formatter),
    new FileHandler("logs.txt", formatter),
]);

const entries: { level: LoggerLevel; message: string }[] = [
    { level: "info", message: "Hello world" },
    { level: "warn", message: "Watch out" },
    { level: "error", message: "Something went wrong" },
    { level: "trace", message: "Trace details" },
];

entries.forEach(({ level, message }) => loggerEmitter.log(level, message));
