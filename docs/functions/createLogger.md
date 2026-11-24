[**@tevm/logger**](../README.md)

***

[@tevm/logger](../globals.md) / createLogger

# Function: createLogger()

> **createLogger**(`options`): [`Logger`](../type-aliases/Logger.md)

Defined in: [createLogger.js:43](https://github.com/evmts/tevm-logger/blob/main/src/createLogger.js#L43)

Creates a tevm logger instance.

Thin wrapper around [pino](https://github.com/pinojs/pino/blob/master/docs/api.md): the returned value is a
pino logger with child loggers and runtime level changes. Configure pino directly for custom transports,
redaction, or serializers.

Records are written as newline-delimited JSON to stdout in Node, and to the `console` in the browser. Every
record carries the `name` passed here, which is how logs from different tevm components are told apart.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options` | [`LogOptions`](../type-aliases/LogOptions.md) | Logger name and minimum level. |

## Returns

[`Logger`](../type-aliases/Logger.md)

A configured pino logger.

## Throws

If pino rejects the supplied level.

## Examples

```typescript
import { createLogger } from '@tevm/logger'

const logger = createLogger({ name: 'tevm-node', level: 'info' })

logger.info('node started')
logger.info({ chainId: 1, blockNumber: String(21000000n) }, 'forked mainnet')

try {
  throw new Error('fork provider unreachable')
} catch (error) {
  // Pass errors under `err` so pino serializes the stack.
  logger.error({ err: error }, 'failed to fork')
}
```

```typescript
import { createLogger } from '@tevm/logger'

// Child loggers inherit the level and destination, and add permanent fields.
const logger = createLogger({ name: 'tevm-node', level: 'debug' })
const requestLogger = logger.child({ requestId: '01H8X' })

requestLogger.debug({ method: 'eth_call' }, 'handling request')
```
