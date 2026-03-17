import { appendFileSync } from "node:fs"

export const fileLogHandler = (message: string) => {
    appendFileSync("log.txt", `${message}\n`, { encoding: "utf-8" })
}
