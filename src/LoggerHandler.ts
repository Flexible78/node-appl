export default interface LoggerHandler {
    handler(): (message: string) => void
}