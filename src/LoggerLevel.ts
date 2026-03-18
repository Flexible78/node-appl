export const loggerLevelPriority = {
    fatal: 1,
    error: 2,
    warn: 3,
    info: 4,
    debug: 5,
    trace: 6,
} as const

export type LoggerLevel = keyof typeof loggerLevelPriority

export const defaultLoggerLevel: LoggerLevel = "info"

export function isLoggerLevel(value: string): value is LoggerLevel {
    return value in loggerLevelPriority
}
