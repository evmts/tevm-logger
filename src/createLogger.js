import { pino } from 'pino'

/**
 * Creates a tevm logger instance.
 *
 * Thin wrapper around [pino](https://github.com/pinojs/pino/blob/master/docs/api.md): the returned value is a
 * plain pino logger, so every pino feature (child loggers, transports, redaction, serializers, runtime level
 * changes) is available and behaves exactly as pino documents it.
 *
 * Records are written as newline-delimited JSON to stdout in Node, and to the `console` in the browser. Every
 * record carries the `name` passed here, which is how logs from different tevm components are told apart.
 *
 * @param {import('./LogOptions.js').LogOptions} options - Logger name and minimum level.
 * @returns {import('./Logger.js').Logger} A configured pino logger.
 * @throws {Error} If `options.level` is not one of `fatal`, `error`, `warn`, `info`, `debug` or `trace`.
 * Pino validates the level eagerly.
 * @example
 * ```typescript
 * import { createLogger } from '@tevm/logger'
 *
 * const logger = createLogger({ name: 'tevm-node', level: 'info' })
 *
 * logger.info('node started')
 * logger.info({ chainId: 1, blockNumber: 21000000n }, 'forked mainnet')
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
