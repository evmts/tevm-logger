# @tevm/logger

[![CI](https://github.com/evmts/tevm-logger/actions/workflows/ci.yml/badge.svg)](https://github.com/evmts/tevm-logger/actions/workflows/ci.yml)
[![npm](https://img.shields.io/npm/v/@tevm/logger.svg)](https://www.npmjs.com/package/@tevm/logger)

Shared structured logging for [TEVM](https://tevm.sh). This package is the small logging layer used by TEVM core and
bundler packages. It wraps [pino](https://getpino.io) so TEVM components can use a consistent logger without depending
on the rest of the TEVM runtime.

This repository was extracted from the
[TEVM monorepo](https://github.com/evmts/tevm-monorepo) with its package history preserved. It is versioned and released
independently, while the umbrella TEVM documentation remains at [tevm.sh](https://tevm.sh).

## Installation

```sh
pnpm add @tevm/logger
```

The package supports both ESM and CommonJS.

## Usage

```ts
import { createLogger } from '@tevm/logger'

const logger = createLogger({
	name: 'my-tevm-app',
	level: 'info',
})

logger.info('TEVM is ready')
```

The available levels are `fatal`, `error`, `warn`, `info`, `debug`, and `trace`.

## Development

Use Node 24 and pnpm 9:

```sh
pnpm install
pnpm lint
pnpm typecheck
pnpm build
pnpm test
```

Package API documentation lives at [logger.tevm.sh](https://logger.tevm.sh). The site source is in
[`site/`](./site) (built with [vocs](https://vocs.dev)):

```sh
pnpm docs:dev     # local dev server
pnpm docs:build   # production build (also checks for dead links)
```

## Releases

User-facing changes should include a Changeset:

```sh
pnpm changeset
```

Merges to `main` update a release pull request. Merging that release pull request publishes the package to npm through
GitHub Actions with npm provenance.

## License

[MIT](./LICENSE)
