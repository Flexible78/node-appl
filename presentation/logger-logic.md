# Logger logic for presentation

## 1. Main idea
The solution has two goals:
- include LoggerLevel inside the formatted message
- allow adding handlers for one specific LoggerLevel

## 2. Shared logger level model
File: src/LoggerLevel.ts
- stores all supported levels in one place
- stores numeric priorities for comparison
- provides fallback level `info`
- provides runtime validation for `process.env.LOGGER_LEVEL`

Why numbers solve the problem:
- fatal = 1
- error = 2
- warn = 3
- info = 4
- debug = 5
- trace = 6

Smaller number means more important level.
If current env level is `warn`, then allowed messages are `fatal`, `error`, `warn`.
That becomes one comparison:
`loggerLevelPriority[level] <= loggerLevelPriority[currentLevel]`

## 3. Formatting with LoggerLevel
File: src/TimeFormatter.ts
The formatter now receives two arguments:
- level
- message

It returns a string like:
`INFO 3/18/26, 02:18:13 Hello world`

So LoggerLevel is now part of the final formatted output.

## 4. Generic handlers and level handlers
File: src/LoggerEmitter.ts
When a message passes the filter, the emitter does two emits:
- `this.emit("message", level, message)` for all generic handlers
- `this.emit(level, level, message)` for handlers of one specific level

This is the key use of the Node.js hint about `emit(eventName, ...args)`.

## 5. Handler flow
Files:
- src/consoleLogHandler.ts
- src/fileLogHandler.ts

Handlers receive both `level` and `message`.
Then they call the formatter and either:
- print to console
- append to file

## 6. Demo scenario in index.ts
File: src/index.ts
- ConsoleHandler receives all allowed messages
- FileHandler("logs.txt") receives all allowed messages
- setLevelHandler("error", new FileHandler("errors.txt", formatter)) receives only ERROR messages

## 7. How to demonstrate to the lecturer
Type check:
`npm run check`

Run with default `info` behavior:
`$env:LOGGER_LEVEL="info"; npx tsx src/index.ts`

Expected in terminal:
- INFO line
- WARN line
- ERROR line
- no TRACE line

Expected in `errors.txt`:
- only ERROR lines

Run with full verbosity:
`$env:LOGGER_LEVEL="trace"; npx tsx src/index.ts`

Expected in terminal:
- INFO
- WARN
- ERROR
- TRACE

## 8. One-minute explanation
I centralized log levels and priorities in one file, passed LoggerLevel into the formatter, and used EventEmitter in two ways: one generic `message` event for all allowed messages and one level-named event for handlers of a specific level. This keeps the code compact and matches the lecturer's hint.
