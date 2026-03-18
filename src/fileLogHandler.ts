import { appendFileSync } from "node:fs"
import type { LoggerLevel } from "./LoggerLevel.js"
import LoggerHandler from "./LoggerHandler.js"
import LoggerFormatter from "./LoggerFormatter.js"

export default class FileHandler implements LoggerHandler {
    constructor(private _filePath: string, private _formatter: LoggerFormatter) {}

    handler(): (level: LoggerLevel, message: string) => void {
        return (level: LoggerLevel, message: string) => appendFileSync(this._filePath, "\n" + this._formatter.format(level, message), { encoding: "utf-8" })
    }
}
