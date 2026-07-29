import { createTsUpOptions } from '@tevm/tsupconfig'

export default createTsUpOptions({
	clean: true,
	dts: true,
	entry: ['./src/index.ts'],
})
