[**@tevm/logger**](../README.md)

***

[@tevm/logger](../globals.md) / Level

# Type Alias: Level

> **Level** = `"fatal"` \| `"error"` \| `"warn"` \| `"info"` \| `"debug"` \| `"trace"`

Defined in: [LogOptions.ts:27](https://github.com/evmts/tevm-logger/blob/main/src/LogOptions.ts#L27)

Log level used to control the verbosity of logging output.

Follows pino's standard levels from most severe to most verbose:
- fatal: Only critical errors that cause the application to crash
- error: Error conditions that might still allow the application to continue
- warn: Warning conditions that should be addressed
- info: Informational messages highlighting normal application progress
- debug: Detailed information for debugging purposes
- trace: Extremely detailed information including function entry/exit

## Example

```typescript
import { createLogger, type Level } from '@tevm/logger'

const logLevel: Level = 'info'
const logger = createLogger({
  name: 'my-module',
  level: logLevel,
})

logger.info('module ready')
```
