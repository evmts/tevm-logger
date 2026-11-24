import { pino } from 'pino'

/**
 * Creates a tevm logger instance.
 *
 * Thin wrapper around [pino](https://github.com/pinojs/pino/blob/master/docs/api.md): the returned value is a
 * pino logger with child loggers and runtime level changes. Configure pino directly for custom transports,
 * redaction, or serializers.
 *
 * Records are written as newline-delimited JSON to stdout in Node, and to the `console` in the browser. Every
 * record carries the `name` passed here, which is how logs from different tevm components are told apart.
 *
 * @param {import('./LogOptions.js').LogOptions} options - Logger name and minimum level.
 * @returns {import('./Logger.js').Logger} A configured pino logger.
 * @throws {Error} If pino rejects the supplied level.
 * @example
 * ```typescript
 * import { createLogger } from '@tevm/logger'
 *
 * const logger = createLogger({ name: 'tevm-node', level: 'info' })
 *
 * logger.info('node started')
 * logger.info({ chainId: 1, blockNumber: String(21000000n) }, 'forked mainnet')
 *
 * try {
 *   throw new Error('fork provider unreachable')
 * } catch (error) {
 *   // Pass errors under `err` so pino serializes the stack.
 *   logger.error({ err: error }, 'failed to fork')
 * }
 * ```
 * @example
 * ```typescript
 * import { createLogger } from '@tevm/logger'
 *
 * // Child loggers inherit the level and destination, and add permanent fields.
 * const logger = createLogger({ name: 'tevm-node', level: 'debug' })
 * const requestLogger = logger.child({ requestId: '01H8X' })
 *
 * requestLogger.debug({ method: 'eth_call' }, 'handling request')
 * ```
 */
export const createLogger = (options) => {
	const pinoLogger = pino({
		name: options.name,
		level: options.level,
	})
	return pinoLogger
}
