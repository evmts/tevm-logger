import { bench, describe } from 'vitest'
import { createLogger } from '../src/index.js'

const options = { time: 200, warmupTime: 50, throws: true }
const errorLogger = createLogger({ name: 'bench', level: 'error' })
const fields = { method: 'eth_call', gas: 21000 }

describe('@tevm/logger', () => {
	bench(
		'construct a logger',
		() => {
			createLogger({ name: 'bench', level: 'info' })
		},
		options,
	)

	bench(
		'suppress trace, debug, and info calls',
		() => {
			errorLogger.trace('trace')
			errorLogger.debug(fields, 'executing call')
			errorLogger.info(fields, 'call complete')
		},
		options,
	)

	bench(
		'create a child with request bindings',
		() => {
			errorLogger.child({ requestId: 'abc' })
		},
		options,
	)
})
