import type { LoggerLevel } from "./LoggerLevel.js"

export default interface LoggerFormatter {
    format(level: LoggerLevel, message: string): string
}
