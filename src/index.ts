import "dotenv/config"
import os from "node:os"
import logger from "./logger.js"
import fs from "node:fs"

logger.info(`project directory is ${process.cwd()}`)

const content = fs.readFileSync(process.cwd() + "/src/logger.ts", { encoding: "ascii" })

console.log(content) // printing whole file

const lines: string[] = content.split("\n")

logger.info(`first line of the file is ${lines[0]}`)
