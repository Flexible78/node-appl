
import "dotenv/config"
import logger from "./logger.js"
import { readFileSync, writeFileSync } from 'node:fs';

type Pathes = {
inputFile: string;
codeFile: string;
commentsFile: string;
}
function getPathes(): Pathes {
if (process.argv.length != 5) {
    throw Error("Wrong command line arguments: usage <command> <input file path> <code file path> <comments file path>")
   }
   const inputFile = process.argv[2] as string;
   const codeFile = process.argv[3] as string;
   const commentsFile = process.argv[4] as string;
   
   return {inputFile, codeFile, commentsFile}

}

function getCodeWithComments(inputFile: string): string[] {
    const content:string =  readFileSync(inputFile, {encoding: "utf8"})
    const res = content.split('\n'); 
    logger.trace("whole arrey of lines containing comments and code is " + res.join(";"))
    logger.debug("count of lines conatining code and comments is " + res.length)
    return res;
}

type CodeComments = {
    code: string;
    comments: string;
}
function codeCommentsSeparation(codeComments: string[]): CodeComments {
     return codeComments.reduce(reducer, {code: "", comments: ""});
}
function reducer (codeComments: CodeComments, line: string): CodeComments {
    let code = codeComments.code;
    let comments = codeComments.comments;
    const indexComment = line.indexOf("/");
    if (indexComment < 0 || line[indexComment + 1] !== '/') { 
        code += '\n' + line; 
    } else {
        const codePart = line.substring(0, indexComment); 
        comments += '\n' + " ".repeat(codePart.length ? 3 : 0) + line.substring(indexComment);
        codePart.trim() !== "" && (code += '\n' + codePart); 
    }
    return {code, comments}

}
function main() {
   try {
     const {inputFile, codeFile, commentsFile} = getPathes(); 
     logger.debug(`input file combining code with comments is ${inputFile}`)
     logger.debug(`file with only code is ${codeFile}`)
     logger.debug(`file with only comments is ${commentsFile}`)
     const codeWithComments: string[] = getCodeWithComments(inputFile); 
     const {code, comments} = codeCommentsSeparation(codeWithComments); 
     writeTofiles(codeFile, code, commentsFile, comments);
     logger.info(`code is saved to file ${codeFile}`);
    logger.info(`comments are saved to file ${commentsFile}`);
   } catch (error) {
    const errorObj = error as Error
      logger.error(errorObj.message) 
   }

}
main();

function writeTofiles(codeFile: string, code: string, commentsFile: string, comments: string) {
    try {
        writeFileSync(codeFile, code);
    } catch (error) {
        throw Error(`writing to file with only code with error: ${(error as Error).message}`)
    }
   try {
     writeFileSync(commentsFile, comments);
   } catch (error) {
     throw Error(`writing to file with only comments with error: ${(error as Error).message}`)
   }
}

