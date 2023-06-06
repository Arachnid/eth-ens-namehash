import commonjs from '@rollup/plugin-commonjs';
import nodeResolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import {defineConfig} from 'rollup'

const TERSER = terser({
	compress: {
		toplevel: true,
		passes: 2, 
		dead_code: true
	}
});

export default defineConfig([
	// default import, ready for treeshaking 
	{
		input: './src/index.mjs',
		external: ['js-sha3'],
		output: [
			{
				file: './dist/index.mjs',
				format: 'es',
			},
			{
				file: './dist/index.cjs',
				format: 'cjs',
			}
		],
	},
	// minified with js-sha3 injected
	{
		input: './src/index.mjs',
		plugins: [
			nodeResolve(), 
			commonjs()
		], 
		output: [
			{
				file: './dist/index.min.mjs',
				plugins: [TERSER],
				format: 'es',
			},
			{
				file: './dist/index.min.cjs',
				plugins: [TERSER],
				format: 'cjs',
			},
		],
	}
]);
