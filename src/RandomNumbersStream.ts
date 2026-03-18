
import { Readable, ReadableOptions } from "node:stream";
export default class RandomNumbersStream extends Readable {
    counter: number = 0
    constructor(private _amount: number, options: ReadableOptions={encoding: "utf-8"}) {
        super(options)
    }
    override _read(_: number): void {
        if (this.counter >= this._amount) {
            this.push(null)
        } else {
            this.push(this.counter + " ")
            this.counter++
        }

    }
}