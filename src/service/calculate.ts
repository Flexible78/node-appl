import { ServiceError } from "../errors/ServiceError.js";
import { CalcData } from "../model/CalcData.js";
const operations: Map<string, (op1: number, op2: number) => number> = new Map([
  ["add", (op1: number, op2: number) => op1 + op2],
  ["sub", (op1: number, op2: number) => op1 - op2],
  ["mul", (op1: number, op2: number) => op1 * op2],
  ["div", (op1: number, op2: number) => {
    if (op2 == 0) throw new ServiceError(400, "op2 cannot be 0");
    return op1 / op2
  }],
  ["percent", (part: number, whole: number) =>{ 
    if (whole == 0) throw new ServiceError(400, "Whole cannot be 0")
    return Math.round(part / whole * 100)
}],
]);
export default function calculate({op1, op2, operation}: CalcData): number {
    const opFun = operations.get(operation)
    if (!opFun) {
        throw new ServiceError(404,`${operation} not implemented`)
    }
    return opFun(op1, op2)
}
