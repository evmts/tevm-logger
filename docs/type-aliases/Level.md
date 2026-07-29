[**@tevm/logger**](../README.md)

***

[@tevm/logger](../globals.md) / Level

# Type Alias: Level

> **Level** = `"fatal"` \| `"error"` \| `"warn"` \| `"info"` \| `"debug"` \| `"trace"`

Defined in: [LogOptions.ts:27](https://github.com/evmts/tevm-logger/blob/main/src/LogOptions.ts#L27)

Log level used to control the verbosity of logging output
Follows standard logging level conventions from least to most verbose:
- fatal: Only critical errors that cause the application to crash
- error: Error conditions that might still allow the application to continue
- warn: Warning conditions that should be addressed
- info: Informational messages highlighting normal application progress
- debug: Detailed information for debugging purposes
- trace: Extremely detailed information including function entry/exit

## Example

```typescript
import { Level } from '@tevm/logger'

// Using as a type
const logLevel: Level = 'info'

// Creating logger with specific level
const logger = createLogger({
  name: 'my-module',
  level: 'debug' // Show all logs at debug level and above
})
```
