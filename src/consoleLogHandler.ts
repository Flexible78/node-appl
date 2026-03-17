import LoggerHandler from "./LoggerHandler.js";

const consoleHandler = (message: string) => console.log(message)
export default class ConsoleHandler implements LoggerHandler {
    handler(): (message: string) => void {
        return  consoleHandler
    }
}