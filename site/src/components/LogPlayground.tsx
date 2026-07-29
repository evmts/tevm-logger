'use client'

import { useState } from 'react'
import { type LogLevel, type LogLine, LogLineRow } from './LogStream'

const LEVELS: LogLevel[] = ['trace', 'debug', 'info', 'warn', 'error', 'fatal']

const LEVEL_RANK: Record<LogLevel, number> = {
	trace: 10,
	debug: 20,
	info: 30,
	warn: 40,
	error: 50,
	fatal: 60,
}

const SUGGESTIONS: Array<Pick<LogLine, 'level' | 'msg'>> = [
	{ level: 'trace', msg: 'SSTORE slot 0x0…3f9a at 0x0000…610a' },
	{ level: 'debug', msg: 'Running block 0x12f3a9 (14 txs)' },
	{ level: 'info', msg: 'Tevm node ready' },
	{ level: 'warn', msg: 'eth_call reverted: insufficient balance' },
	{ level: 'error', msg: 'Fork transport timeout — retrying' },
	{ level: 'fatal', msg: 'State root mismatch — unrecoverable' },
]

/**
 * Interactive playground: pick a level, name, and message, emit logs, and
 * watch pino-style JSON lines stream out. The "minimum level" select shows
 * how createLogger({ level }) filters output.
 */
export function LogPlayground() {
	const [name, setName] = useState('my-module')
	const [msg, setMsg] = useState('hello from @tevm/logger')
	const [level, setLevel] = useState<LogLevel>('info')
	const [minLevel, setMinLevel] = useState<LogLevel>('trace')
	const [lines, setLines] = useState<LogLine[]>([])

	const emit = (l: LogLevel = level, m: string = msg) => {
		if (LEVEL_RANK[l] < LEVEL_RANK[minLevel]) return
		setLines((prev) => [...prev.slice(-14), { level: l, name, msg: m, time: Date.now(), pid: 4242 }])
	}

	return (
		<div className="tevm-playground">
			<div className="tevm-playground-controls">
				<div className="tevm-field">
					<label htmlFor="tevm-pg-name">name</label>
					<input id="tevm-pg-name" value={name} onChange={(e) => setName(e.target.value)} size={14} />
				</div>
				<div className="tevm-field">
					<label htmlFor="tevm-pg-level">log level</label>
					<select id="tevm-pg-level" value={level} onChange={(e) => setLevel(e.target.value as LogLevel)}>
						{LEVELS.map((l) => (
							<option key={l} value={l}>
								{l}
							</option>
						))}
					</select>
				</div>
				<div className="tevm-field">
					<label htmlFor="tevm-pg-min">logger level (filter)</label>
					<select id="tevm-pg-min" value={minLevel} onChange={(e) => setMinLevel(e.target.value as LogLevel)}>
						{LEVELS.map((l) => (
							<option key={l} value={l}>
								{l}
							</option>
						))}
					</select>
				</div>
				<div className="tevm-field" style={{ flex: 1, minWidth: '14rem' }}>
					<label htmlFor="tevm-pg-msg">message</label>
					<input
						id="tevm-pg-msg"
						value={msg}
						onChange={(e) => setMsg(e.target.value)}
						onKeyDown={(e) => e.key === 'Enter' && emit()}
						style={{ width: '100%' }}
					/>
				</div>
				<button type="button" className="tevm-button tevm-button--primary" onClick={() => emit()}>
					Emit log
				</button>
				<button type="button" className="tevm-button" onClick={() => setLines([])}>
					Clear
				</button>
			</div>

			<div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
				{SUGGESTIONS.map((s) => (
					<button
						key={s.msg}
						type="button"
						className="tevm-button"
						style={{ fontSize: '0.78rem', padding: '0.3rem 0.7rem' }}
						onClick={() => emit(s.level, s.msg)}
					>
						{s.level}: {s.msg}
					</button>
				))}
			</div>

			<div className="tevm-terminal">
				<div className="tevm-terminal-titlebar">
					<span className="tevm-terminal-dot" />
					<span className="tevm-terminal-dot" />
					<span className="tevm-terminal-dot" />
					<span className="tevm-terminal-title">
						createLogger({'{'} name: '{name}', level: '{minLevel}' {'}'})
					</span>
				</div>
				<div className="tevm-terminal-body">
					{lines.length === 0 ? (
						<span style={{ color: '#667085' }}>
							{'// Nothing logged yet — emit a log above. Logs below the logger level are silently dropped.'}
						</span>
					) : (
						lines.map((line) => <LogLineRow key={line.time + line.msg} line={line} />)
					)}
				</div>
			</div>
		</div>
	)
}
