[**@tevm/logger**](../README.md)

***

[@tevm/logger](../globals.md) / Logger

# Type Alias: Logger

> **Logger** = `Logger`

Defined in: [Logger.ts:19](https://github.com/evmts/tevm-logger/blob/main/src/Logger.ts#L19)

The pino logger returned by [createLogger](../functions/createLogger.md).

The logger supports pino's standard level methods, child bindings, runtime
level changes, serializers, redaction, and transports.

## Example

```typescript
import { createLogger, type Logger } from '@tevm/logger'

const logRequest = (logger: Logger, method: string) => {
  logger.debug({ method }, 'handling request')
}

const logger = createLogger({ name: 'rpc-server', level: 'debug' })
logRequest(logger.child({ requestId: '01H8X' }), 'eth_call')
```
