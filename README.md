# Format messages with LoggerLevel
## Figure out any solution allowing including LoggerLevel inside formatted log message
### Example 
 INFO 3/17/26, 07:51:30 Hello world
### Hint: see https://nodejs.org/docs/latest-v22.x/api/events.html#emitteremiteventname-args

# New feature: handling messages with specified LoggerLevel
## Figure out any solution allowing the user to add handlers for any possible LoggerLevel
### Example 
method of the class LoggerEmitter: **setLevelHandler(level: LoggerLevel, handler: LoggerHandler)**