// Highly adapted from pino api https://github.com/pinojs/pino/blob/master/docs/api.md

/**
 * Log level used to control the verbosity of logging output.
 *
 * Follows pino's standard levels from most severe to most verbose:
 * - fatal: Only critical errors that cause the application to crash
 * - error: Error conditions that might still allow the application to continue
 * - warn: Warning conditions that should be addressed
 * - info: Informational messages highlighting normal application progress
 * - debug: Detailed information for debugging purposes
 * - trace: Extremely detailed information including function entry/exit
 *
 * @example
 * ```typescript
 * import { createLogger, type Level } from '@tevm/logger'
 *
 * const logLevel: Level = 'info'
 * const logger = createLogger({
 *   name: 'my-module',
 *   level: logLevel,
 * })
 *
 * logger.info('module ready')
 * ```
 */
export type Level = 'fatal' | 'error' | 'warn' | 'info' | 'debug' | 'trace'

/**
 * Configuration passed to {@link createLogger}.
 *
 * @example
 * ```typescript
 * import { createLogger, type LogOptions } from '@tevm/logger'
 *
 * const options: LogOptions = {
 *   name: 'rpc-server',
 *   level: 'info',
 * }
 *
 * const logger = createLogger(options)
 * logger.info({ port: 8545 }, 'server listening')
 * ```
 */
export type LogOptions = {
	/**
	 * The component name added to every emitted record.
	 */
	name: string
	/**
	 * The minimum severity to emit. Less-severe records are discarded.
	 */
	level: Level
}
