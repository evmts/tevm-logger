[**@tevm/logger**](../README.md)

***

[@tevm/logger](../globals.md) / createLogger

# Function: createLogger()

> **createLogger**(`options`): [`Logger`](../type-aliases/Logger.md)

Defined in: [createLogger.js:44](https://github.com/evmts/tevm-logger/blob/main/src/createLogger.js#L44)

Creates a tevm logger instance.

Thin wrapper around [pino](https://github.com/pinojs/pino/blob/master/docs/api.md): the returned value is a
plain pino logger, so every pino feature (child loggers, transports, redaction, serializers, runtime level
changes) is available and behaves exactly as pino documents it.

Records are written as newline-delimited JSON to stdout in Node, and to the `console` in the browser. Every
record carries the `name` passed here, which is how logs from different tevm components are told apart.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options` | [`LogOptions`](../type-aliases/LogOptions.md) | Logger name and minimum level. |

## Returns

[`Logger`](../type-aliases/Logger.md)

A logger instance

## Throws

If `options.level` is not one of `fatal`, `error`, `warn`, `info`, `debug` or `trace`. pino
validates the level eagerly and throws `unknown level <level>`.

## Examples

```typescript
import { createLogger } from '@tevm/logger'

const logger = createLogger({ name: 'tevm-node', level: 'info' })

logger.info('node started')
logger.info({ chainId: 1, blockNumber: 21000000n }, 'forked mainnet')

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
