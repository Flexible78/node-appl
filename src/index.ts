import "dotenv/config";
import logger from "./logger.js";
import { createWriteStream } from "node:fs";
import RandomNumbersStream from "./RandomNumbersStream.js";
const writeStream = createWriteStream("large_file", {encoding: "utf8", highWaterMark: 1024 * 1024 * 10})
console.time("pipe")
new RandomNumbersStream(1_000_000_000).pipe(writeStream)
writeStream.on("finish", ()=>console.timeEnd("pipe"))


