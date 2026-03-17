import { EventEmitter } from 'node:events';

export default class LoggerEmitter extends EventEmitter {
    log(message: string): void {
        this.emit("message", message);
    }
}
