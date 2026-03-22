import "dotenv/config";
import logger from "../logger.js";
import http, { ServerResponse } from "node:http";
import calculate from "../service/calculate.js";
import { CalcData } from "../model/CalcData.js";
import { ServiceError } from "../errors/ServiceError.js";
const server = http.createServer();
const port = process.env.PORT || 3500;
server.listen(port, () => console.log(`server listening on port ${port}`));

server.on("request", (req, res) => {
  logger.debug(`URL is ${req.url}`);
  try {
    const calcData = getCalcData(req.url);
    logger.debug("calcData is " + JSON.stringify(calcData));
      const result = calculate(calcData).toString();
      logger.debug(`result = ${result}`);
      sendResponse(res, 200, result)
    }
  catch (error: any) {
    if (error instanceof ServiceError) {
       sendResponse(res, error.code, error.message)
    } else {
        sendResponse(res, 500, `Inner Server error: ${error.message}`)
    }
  }

});
function getCalcData(url: string | undefined): CalcData {
  const urlTokens: any = url?.split("/");
  if (!url || urlTokens.length != 4)
    throw new ServiceError(400, "Wrong request, usage /<operation>/<op1>/<op2>");
  let result: CalcData | null = null;
  const op1: number = +urlTokens[2];
  const op2: number = +urlTokens[3];
  const operation: string = urlTokens[1];
  if (isNaN(op1)) throw new ServiceError(400, `an operand op1 (${urlTokens[2]}) must be a number`);
  if (isNaN(op2)) throw new ServiceError(400, `an operand op1 (${urlTokens[3]}) must be a number`);
  result = { op1, op2, operation };

  return result;
}
function sendResponse(response: ServerResponse, code: number, message: string): void {
    response.statusCode = code,
    response.end(message)
}
