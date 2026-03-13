import pino from "pino"
import pretty from "pino-pretty"

const stream = pretty({
  translateTime: "HH:MM:ss",
  ignore: "pid,hostname",
  levelFirst: true,
  singleLine: true
})

const validLevels = new Set(["trace", "debug", "info", "warn", "error", "fatal", "silent"])
const envLevel = (process.env.LOGGER_LEVEL ?? "").toLowerCase()
const level = validLevels.has(envLevel) ? envLevel : "info"

const logger = pino({ level }, stream)
export default logger