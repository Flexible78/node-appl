import "dotenv/config";
import logger from "./logger.js";
type Params = {
  nNumbers: number;
  minValue: number;
  maxValue: number;
};
const DEFAULT_N_NUMBERS = 7;
const DEFAULT_MIN_VALUE = 1;
const DEFAULT_MAX_VALUE = 49;
function main() {
  try {
    const params: Params = getParams();
    logger.debug(`received params are ${JSON.stringify(params)}`)
    const numbers: number[] = getUniqueRandomNumbers(params);
    printNumbers(numbers);
  } catch (error) {
    const errorObj = error as Error;
    logger.error(errorObj.message);
  }
}

function getParams(): Params {
  const { argv } = process;
  const nNumbers = getNnumbers(argv[2]);
  const minValue = getMinValue(argv[3]);
  const maxValue = getMaxValue(argv[4]);
  if (maxValue <= minValue) {
    throw new Error(
      "Maximal value (argument #3) must be greater than Minimal value (argument #2)",
    );
  }
  if (nNumbers > maxValue - minValue + 1) {
    throw new Error(
      "Amount of the unique random numbers (argument #1) must be equal or less than difference between maximal value (argument #3) and minimal value (argument #2)",
    );
  }
  return { nNumbers, minValue, maxValue };
}

function getNnumbers(param: string | undefined): number {
  return getValue(
    param, "AMount",
    "Amount of numbers (argument #1) must be a positive integer number",
    DEFAULT_N_NUMBERS,
    (num) => num > 1,
  );
}
function getMinValue(param: string | undefined): number {
  return getValue(
    param, "Minimal value",
    "Minimal value (argument #2) must be an integer number ",
    DEFAULT_MIN_VALUE,
  );
}
function getMaxValue(param: string | undefined): number {
  return getValue(
    param, "Maximal value",
    "Maximal value (argument #3) must be an integer number ",
    DEFAULT_MAX_VALUE,
  );
}
function printNumbers(numbers: number[]): void {
  console.log(numbers.join("; "));
}
function getUniqueRandomNumbers({
  nNumbers,
  minValue,
  maxValue,
}: Params): number[] {
  let length = 0;
  const res: number[] = [];
  while (length < nNumbers) {
    const num = getRandomNumber(minValue, maxValue);
    if (!res.includes(num)) {
      length = res.push(num);
    }
  }
  return res;
}
function getRandomNumber(min: number, max: number): number {
  return Math.trunc(Math.random() * (max - min + 1)) + min;
}
function getValue(
  param: string | undefined,
  name: string,
  errorMessage: string,
  defaultValue: number,
  additional?: (num: number) => boolean,
): number {
  let value: number = defaultValue;
  if (param) {
    value = +param;
    if (!Number.isInteger(value) || (additional && !additional(value))) {
      throw new Error(errorMessage);
    }
    logger.debug(`${name}: received param from command line`)
  } else {
    logger.debug(`${name}: default value is taken`)
  }
  return value;
}
main()
