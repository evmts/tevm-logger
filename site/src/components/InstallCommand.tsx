'use client'

import { useState } from 'react'

const MANAGERS = {
	npm: 'npm install @tevm/logger',
	pnpm: 'pnpm add @tevm/logger',
	yarn: 'yarn add @tevm/logger',
	bun: 'bun add @tevm/logger',
} as const

type Manager = keyof typeof MANAGERS

export function InstallCommand() {
	const [manager, setManager] = useState<Manager>('pnpm')
	const [copied, setCopied] = useState(false)

	const copy = async () => {
		try {
			await navigator.clipboard.writeText(MANAGERS[manager])
			setCopied(true)
			setTimeout(() => setCopied(false), 1500)
		} catch {
			setCopied(false)
		}
	}

	return (
		<span className="tevm-install">
			<span className="tevm-install-tabs">
				{(Object.keys(MANAGERS) as Manager[]).map((m) => (
					<button
						key={m}
						type="button"
						className="tevm-install-tab"
						data-active={m === manager}
						onClick={() => setManager(m)}
					>
						{m}
					</button>
				))}
			</span>
			<span className="tevm-install-code">{MANAGERS[manager]}</span>
			<button type="button" className="tevm-install-copy" onClick={copy}>
				{copied ? 'copied' : 'copy'}
			</button>
		</span>
	)
}
