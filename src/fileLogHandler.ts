import { appendFileSync } from "node:fs"
export const fileHandler = (message: string) => appendFileSync("log.text", message, {encoding: "utf-8"})