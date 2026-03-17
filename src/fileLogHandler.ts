import { appendFileSync } from "node:fs"
import LoggerHandler from "./LoggerHandler.js"
export default class FileHandler implements LoggerHandler {
    constructor(private _filePath: string) {}
    handler(): (message: string) => void {
        return (message: string) => appendFileSync(this._filePath, "\n" + message, {encoding: "utf-8"})
    }
}