# LoggerEmitter line by line

File: src/LoggerEmitter.ts

1. Import EventEmitter from Node.js. It is the base mechanism for subscribing and emitting events.
2-7. Import shared logger helpers:
- defaultLoggerLevel gives fallback level (`info`)
- isLoggerLevel validates env value
- loggerLevelPriority stores level priorities
- LoggerLevel is the shared union type
8. Import LoggerHandler interface.
10. Start LoggerEmitter class.
11. Constructor accepts an array of handlers.
12. Call parent constructor of EventEmitter.
13. Register every passed handler as a generic `message` handler.
16. Start `log(level, message)` method.
17. Read `LOGGER_LEVEL` from environment and fallback to default `info`.
18. If env value is invalid, replace it with default `info`.
20. Compare message priority with configured priority.
21. Emit generic `message` event for handlers that should receive all allowed messages.
22. Emit level-specific event like `error`, `warn`, `info` for handlers registered only for that level.
26. `setHandler` subscribes a handler to the generic `message` event.
27. Handler provides its callback through `handler.handler()`.
30. `setLevelHandler` subscribes a handler to one concrete LoggerLevel event.
31. The event name itself is the level, for example `error`.
33. End of class.

Short explanation for the lecturer:
The class has one generic event for all allowed messages and one level-specific event for each LoggerLevel. That is why Node EventEmitter fits the task well.
