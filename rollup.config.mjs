import pkg from './package.json' assert { type: 'json' }

import esbuild from 'rollup-plugin-esbuild'
import dts from 'rollup-plugin-dts'
import json from '@rollup/plugin-json'

const generatedCode = {
    arrowFunctions: true,
    constBindings: true,
    objectShorthand: true
}

const source = {
    input: 'src/index.ts',
    external: ['undici-shim', 'tslib', 'net'],
    plugins: [esbuild(), json()],
    output: [{ 
        generatedCode, 
        file: pkg.main, 
        format: 'umd',
        name: 'mojanglib'
    }, {
        generatedCode,
        file: pkg.module, 
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