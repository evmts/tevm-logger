import { execFileSync } from 'node:child_process'
import { expect, it } from 'vitest'

it.each([
	['module', "import { createLogger } from '@tevm/logger'"],
	['commonjs', "const { createLogger } = require('@tevm/logger')"],
])('writes structured stdout through the built %s export', (format, load) => {
	const stdout = execFileSync(
		process.execPath,
		[
			`--input-type=${format}`,
			'--eval',
			`${load}
			const logger = createLogger({ name: 'rpc', level: 'info' })
			const child = logger.child({ requestId: 'abc' })
			child.debug('filtered')
			child.info({ method: 'eth_call' }, 'handling %s', 'request')
			child.error({ err: new TypeError('invalid request') }, 'request failed')
			logger.info('ready')`,
		],
		{ encoding: 'utf8' },
	)
	expect(stdout.endsWith('\n')).toBe(true)
	const records = stdout
		.trimEnd()
		.split('\n')
		.map((line) => JSON.parse(line))
	expect(records).toMatchObject([
		{ level: 30, name: 'rpc', requestId: 'abc', method: 'eth_call', msg: 'handling request' },
		{
			level: 50,
			name: 'rpc',
			requestId: 'abc',
			err: {
				type: 'TypeError',
				message: 'invalid request',
				stack: expect.stringContaining('TypeError: invalid request'),
			},
			msg: 'request failed',
		},
		{ level: 30, name: 'rpc', msg: 'ready' },
	])
	expect(records[2]).not.toHaveProperty('requestId')
})
