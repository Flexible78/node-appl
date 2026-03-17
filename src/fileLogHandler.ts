import { appendFileSync } from "node:fs"
export const fileHandler = (message: string) => appendFileSync("log.text", "\n" + message, {encoding: "utf-8"})