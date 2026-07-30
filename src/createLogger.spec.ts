import { describe, expect, it } from 'vitest'
import { createLogger } from './createLogger.js'
import type { Level } from './LogOptions.js'

const levels = ['fatal', 'error', 'warn', 'info', 'debug', 'trace'] as const satisfies readonly Level[]

describe(createLogger.name, () => {
	it.each(levels)('creates a logger at the %s level', (level) => {
		const logger = createLogger({
			name: 'testLogger',
			level,
		})

		expect(logger.level).toBe(level)
		expect(logger.bindings()).toMatchObject({ name: 'testLogger' })
	})

	it('filters records below the configured threshold', () => {
		const logger = createLogger({ name: 'threshold-test', level: 'info' })

		expect(logger.isLevelEnabled('debug')).toBe(false)
		expect(logger.isLevelEnabled('info')).toBe(true)
		expect(logger.isLevelEnabled('fatal')).toBe(true)
	})

	it('creates child loggers with inherited level and additional bindings', () => {
		const logger = createLogger({ name: 'rpc-server', level: 'debug' })
		const child = logger.child({ requestId: '01H8X' })

		expect(child.level).toBe('debug')
		expect(child.bindings()).toMatchObject({
			name: 'rpc-server',
			requestId: '01H8X',
		})
	})

	it('rejects an invalid runtime level', () => {
		expect(() => createLogger({ name: 'invalid-level', level: 'verbose' as never })).toThrow(Error)
	})
})
