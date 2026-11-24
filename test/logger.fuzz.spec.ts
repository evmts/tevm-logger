import fc from 'fast-check'
import { expect, it, vi } from 'vitest'
import { createLogger, type Level } from '../src/index.js'

const levels = ['trace', 'debug', 'info', 'warn', 'error', 'fatal'] as const satisfies readonly Level[]
const level = fc.constantFrom(...levels)
const text = fc.string({ unit: 'binary', maxLength: 64 })

it('emits one parseable record per enabled level and preserves structured data', () => {
	// Pino uses the stdout stream directly when its write method is overridden.
	const write = vi.spyOn(process.stdout, 'write').mockReturnValue(true)
	try {
		fc.assert(
			fc.property(level, text, text, fc.jsonValue(), (threshold, name, message, payload) => {
				write.mockClear()
				const logger = createLogger({ name, level: threshold })
				for (const severity of levels) {
					logger[severity]({ payload }, 'message: %s', message)
				}

				const enabled = levels.slice(levels.indexOf(threshold))
				expect(write).toHaveBeenCalledTimes(enabled.length)
				for (const [index, [line]] of write.mock.calls.entries()) {
					const record = String(line)
					expect(record.split('\n')).toHaveLength(2)
					expect(record.endsWith('\n')).toBe(true)
					expect(JSON.parse(record)).toMatchObject({
						level: (levels.indexOf(threshold) + index + 1) * 10,
						msg: `message: ${message}`,
						payload: JSON.parse(JSON.stringify(payload)),
						name,
					})
				}
			}),
			{ numRuns: 300, examples: [['trace', '', '', -0]] },
		)
	} finally {
		write.mockRestore()
	}
})

it('rejects unknown level strings at construction', () => {
	fc.assert(
		fc.property(text, (suffix) => {
			expect(() => createLogger({ name: 'invalid', level: `unknown-${suffix}` as Level })).toThrow()
		}),
	)
})
