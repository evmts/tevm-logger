import { defineConfig } from 'vocs/config'

export default defineConfig({
	title: '@tevm/logger',
	titleTemplate: '%s · @tevm/logger',
	description: 'Shared structured logging for Tevm core and the Tevm bundler.',
	baseUrl: 'https://logger.tevm.sh',
	rootDir: '.',
	srcDir: 'src',
	renderStrategy: 'full-static',
	logoUrl: {
		light: '/tevm-logo-light.png',
		dark: '/tevm-logo-dark.png',
	},
	iconUrl: '/tevm-logo.webp',
	ogImageUrl: 'https://vocs.dev/api/og?logo=%logo&title=%title&description=%description',
	// vocs 2.x: `theme.accentColor` / `theme.colorScheme` moved to the top level.
	accentColor: 'light-dark(#0085FF, #4DA6FF)',
	colorScheme: 'light dark',
	editLink: {
		link: 'https://github.com/evmts/tevm-logger/edit/main/site/src/pages/:path',
		text: 'Edit on GitHub',
	},
	socials: [{ icon: 'github', link: 'https://github.com/evmts/tevm-logger' }],
	topNav: [
		{ text: 'Getting started', link: '/getting-started/installation', match: '/getting-started' },
		{ text: 'Playground', link: '/playground', match: '/playground' },
		{ text: 'Guides', link: '/guides/log-levels', match: '/guides' },
		{ text: 'API', link: '/reference/create-logger', match: '/reference' },
		{
			text: 'Tevm docs',
			items: [
				{ text: 'Tevm', link: 'https://tevm.sh' },
				{ text: 'Contract', link: 'https://contract.tevm.sh' },
				{ text: 'Utils', link: 'https://utils.tevm.sh' },
				{ text: 'Logger', link: 'https://logger.tevm.sh' },
				{ text: 'Test', link: 'https://test.tevm.sh' },
				{ text: 'Ethers', link: 'https://ethers.tevm.sh' },
				{ text: 'Mud', link: 'https://mud.tevm.sh' },
				{ text: 'CLI', link: 'https://cli.tevm.sh' },
				{ text: 'Bundler', link: 'https://bundler.tevm.sh' },
				{ text: 'Examples', link: 'https://examples.tevm.sh' },
			],
		},
		{
			text: 'Ecosystem',
			items: [
				{ text: 'Tevm Node', link: 'https://node.tevm.sh' },
				{ text: 'pino', link: 'https://getpino.io' },
			],
		},
	],
	sidebar: [
		{ text: 'What is @tevm/logger?', link: '/' },
		{ text: 'Playground', link: '/playground' },
		{
			text: 'Getting started',
			collapsed: false,
			items: [
				{ text: 'Installation', link: '/getting-started/installation' },
				{ text: 'Quick start', link: '/getting-started/quick-start' },
			],
		},
		{
			text: 'Guides',
			collapsed: false,
			items: [
				{ text: 'Log levels', link: '/guides/log-levels' },
				{ text: 'Child loggers & context', link: '/guides/child-loggers' },
				{ text: 'Pretty printing in development', link: '/guides/pretty-printing' },
				{ text: 'Transports & redaction in production', link: '/guides/production' },
				{ text: 'Using the logger with Tevm Node', link: '/guides/tevm-node' },
				{ text: 'Testing code that logs', link: '/guides/testing' },
			],
		},
		{
			text: 'API reference',
			collapsed: false,
			items: [
				{ text: 'createLogger', link: '/reference/create-logger' },
				{ text: 'Logger', link: '/reference/logger' },
				{ text: 'LogOptions', link: '/reference/log-options' },
			],
		},
		{ text: 'Relationship to Tevm', link: '/relationship-to-tevm' },
	],
})
