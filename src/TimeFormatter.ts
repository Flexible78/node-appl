import type { LoggerLevel } from "./LoggerLevel.js"
import LoggerFormatter from "./LoggerFormatter.js";

export default class TimeFormatter implements LoggerFormatter {
    constructor(private _timeZone?: string) {}

    format(level: LoggerLevel, message: string): string {
        let running = true;
        let time: Intl.DateTimeFormat;

        while (running) {
            try {
                time = Intl.DateTimeFormat(undefined, {
                    timeZone: this._timeZone || process.env.TZ,
                    dateStyle: "short",
                    timeStyle: "medium",
                    hour12: false,
                });
                running = false;
            } catch {
                this._timeZone = undefined;
            }
        }

        return `${level.toUpperCase()} ${time!.format(new Date())} ${message}`;
    }
}
