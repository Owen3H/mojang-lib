import pkg from './package.json' assert { type: 'json' }

import esbuild from 'rollup-plugin-esbuild'
import dts from 'rollup-plugin-dts'
import json from '@rollup/plugin-json'
import nodePolyfills from 'rollup-plugin-polyfill-node'

const generatedCode = {
    arrowFunctions: true,
    constBindings: true,
    objectShorthand: true
}

const source = {
    input: 'src/index.ts',
    external: ['tslib', 'net', /*'undici-shim'*/],
    plugins: [esbuild(), json(), nodePolyfills()],
    output: [{ 
        generatedCode, 
        file: pkg.exports.default, 
        format: 'umd',
        name: 'mojanglib',
        // globals: {
        //     'undici-shim': 'undici'
        // }
    }, {
        generatedCode,
        file: pkg.exports.import, 
        format: 'es',
        sourcemap: true
    }]
}

const types = {
    input: 'src/index.ts',
    output: [{ file: 'dist/types.d.ts', format: 'es' }],
    plugins: [dts()]
}

export default [source, types]