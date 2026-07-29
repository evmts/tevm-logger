'use client'

import { useEffect, useRef, useState } from 'react'

export type LogLevel = 'trace' | 'debug' | 'info' | 'warn' | 'error' | 'fatal'

export type LogLine = {
	level: LogLevel
	name: string
	msg: string
	time: number
	pid: number
}

const SAMPLES: Array<Pick<LogLine, 'level' | 'name' | 'msg'>> = [
	{ level: 'info', name: 'tevm:node', msg: 'Tevm node ready — listening for JSON-RPC requests' },
	{ level: 'debug', name: 'tevm:vm', msg: 'Running block 0x12f3a9 (14 txs, gasUsed 1,984,221)' },
	{ level: 'trace', name: 'tevm:evm', msg: 'SSTORE slot 0x0…3f9a at 0x0000…610a' },
	{ level: 'info', name: 'tevm:bundler', msg: 'Compiled Counter.sol → Counter.ts in 41ms' },
	{ level: 'debug', name: 'tevm:state', msg: 'Checkpoint opened (depth 2)' },
	{ level: 'warn', name: 'tevm:actions', msg: 'eth_call reverted: execution reverted: insufficient balance' },
	{ level: 'error', name: 'tevm:node', msg: 'Fork transport timeout after 10,000ms — retrying' },
	{ level: 'info', name: 'tevm:state', msg: 'Committing state root 0x9c1e…4bd7' },
	{ level: 'debug', name: 'tevm:vm', msg: 'Block sealed in 3.2ms' },
	{ level: 'trace', name: 'tevm:evm', msg: 'CALL depth=1 value=0n gas=29004n' },
]

export function LogStream({ intervalMs = 1400, maxLines = 9 }: { intervalMs?: number; maxLines?: number }) {
	const [lines, setLines] = useState<LogLine[]>(() => [makeLine(SAMPLES[0], 0)])
	const tick = useRef(1)

	useEffect(() => {
		const id = setInterval(() => {
			setLines((prev) => {
				const next = [...prev, makeLine(SAMPLES[tick.current % SAMPLES.length], tick.current)]
				tick.current += 1
				return next.slice(-maxLines)
			})
		}, intervalMs)
		return () => clearInterval(id)
	}, [intervalMs, maxLines])

	return (
		<div className="tevm-terminal">
			<div className="tevm-terminal-titlebar">
				<span className="tevm-terminal-dot" />
				<span className="tevm-terminal-dot" />
				<span className="tevm-terminal-dot" />
				<span className="tevm-terminal-title">@tevm/logger — live output</span>
			</div>
			<div className="tevm-terminal-body">
				{lines.map((line, i) => (
					<LogLineRow key={`${line.time}-${i}`} line={line} />
				))}
			</div>
		</div>
	)
}

export function LogLineRow({ line }: { line: LogLine }) {
	return (
		<div className="tevm-log-line">
			<span className={`tevm-log-badge tevm-log-badge--${line.level}`}>{line.level}</span>
			<span className="tevm-log-json">
				{'{'}
				<span className="tevm-log-key">"level"</span>:{levelValue(line.level)},{' '}
				<span className="tevm-log-key">"time"</span>:{line.time}, <span className="tevm-log-key">"pid"</span>:{line.pid}
				, <span className="tevm-log-key">"name"</span>:"{line.name}", <span className="tevm-log-key">"msg"</span>:
				<span className="tevm-log-msg">"{line.msg}"</span>
				{'}'}
			</span>
		</div>
	)
}

const BASE_TIME = 1_700_000_000_000

function makeLine(sample: Pick<LogLine, 'level' | 'name' | 'msg'>, i: number): LogLine {
	return {
		...sample,
		time: BASE_TIME + i * 137,
		pid: 4242,
	}
}

function levelValue(level: LogLevel): number {
	return { trace: 10, debug: 20, info: 30, warn: 40, error: 50, fatal: 60 }[level]
}
