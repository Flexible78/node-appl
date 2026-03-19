import "dotenv/config";
import logger from "./logger.js";
import readline from "node:readline"
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})
function ask() {
  rl.question("enter arithmetic expression or exit >   ", (line) => {
    if(line === "exit") {
      rl.close()
    } else {
     try {
       const res = eval(line)
       console.log(`Result=${res}`)
     } catch (error) {
         console.error(`invalid expression ${(error as Error).message}`)
     }
    }
    ask()
  })
}
ask()


