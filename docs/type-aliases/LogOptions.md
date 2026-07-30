[**@tevm/logger**](../README.md)

***

[@tevm/logger](../globals.md) / LogOptions

# Type Alias: LogOptions

> **LogOptions** = `object`

Defined in: [LogOptions.ts:45](https://github.com/evmts/tevm-logger/blob/main/src/LogOptions.ts#L45)

Configuration passed to [createLogger](../functions/createLogger.md).

## Example

```typescript
import { createLogger, type LogOptions } from '@tevm/logger'

const options: LogOptions = {
  name: 'rpc-server',
  level: 'info',
}

const logger = createLogger(options)
logger.info({ port: 8545 }, 'server listening')
```

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="level"></a> `level` | [`Level`](Level.md) | The minimum severity to emit. Less-severe records are discarded. | [LogOptions.ts:53](https://github.com/evmts/tevm-logger/blob/main/src/LogOptions.ts#L53) |
| <a id="name"></a> `name` | `string` | The component name added to every emitted record. | [LogOptions.ts:49](https://github.com/evmts/tevm-logger/blob/main/src/LogOptions.ts#L49) |
