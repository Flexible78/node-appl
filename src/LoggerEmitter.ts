import { EventEmitter } from "node:events";
import {
    defaultLoggerLevel,
    isLoggerLevel,
    loggerLevelPriority,
    type LoggerLevel,
} from "./LoggerLevel.js";
import LoggerHandler from "./LoggerHandler.js";

export default class LoggerEmitter extends EventEmitter {
    constructor(handlers: LoggerHandler[] = []) {
        super();
        handlers.forEach(handler => this.setHandler(handler));
    }

    log(level: LoggerLevel, message: string): void {
        const envLevel = process.env.LOGGER_LEVEL?.toLowerCase() ?? defaultLoggerLevel;
        const currentLevel = isLoggerLevel(envLevel) ? envLevel : defaultLoggerLevel;

        if (loggerLevelPriority[level] <= loggerLevelPriority[currentLevel]) {
            this.emit("message", level, message);
            this.emit(level, level, message);
        }
    }

    setHandler(handler: LoggerHandler): void {
        this.on("message", handler.handler());
    }

    setLevelHandler(level: LoggerLevel, handler: LoggerHandler): void {
        this.on(level, handler.handler());
    }
}
