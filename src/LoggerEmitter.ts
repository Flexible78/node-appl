import { EventEmitter } from 'node:events';
import LoggerHandler from './LoggerHandler.js';
export default class LoggerEmitter extends EventEmitter {
    constructor(handlers: LoggerHandler[]=[]) {
        super();
        handlers.forEach(h => this.on("message", h.handler()))
    }
    log(message: string): void {
        this.emit("message", message)
    }
    setHandler(handler: (message:string) => void) {
        this.on("message", handler)
    }
}