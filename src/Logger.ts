/**
 * The pino logger returned by {@link createLogger}.
 *
 * The logger supports pino's standard level methods, child bindings, runtime
 * level changes, serializers, redaction, and transports.
 *
 * @example
 * ```typescript
 * import { createLogger, type Logger } from '@tevm/logger'
 *
 * const logRequest = (logger: Logger, method: string) => {
 *   logger.debug({ method }, 'handling request')
 * }
 *
 * const logger = createLogger({ name: 'rpc-server', level: 'debug' })
 * logRequest(logger.child({ requestId: '01H8X' }), 'eth_call')
 * ```
 */
export type Logger = import('pino').Logger<never>
