import type { LoggerLevel } from "./LoggerLevel.js"
import LoggerHandler from "./LoggerHandler.js";
import LoggerFormatter from "./LoggerFormatter.js";

export default class ConsoleHandler implements LoggerHandler {
    constructor(private _formatter: LoggerFormatter) {}

    handler(): (level: LoggerLevel, message: string) => void {
        return (level: LoggerLevel, message: string) => console.log(this._formatter.format(level, message));
    }
}
