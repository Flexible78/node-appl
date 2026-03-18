import type { LoggerLevel } from "./LoggerLevel.js"

export default interface LoggerHandler {
    handler(): (level: LoggerLevel, message: string) => void
}
