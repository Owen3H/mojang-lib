import esbuild from 'rollup-plugin-esbuild'
import pkg from './package.json' assert { type: 'json' }

const generatedCode = {
    arrowFunctions: true,
    constBindings: true,
    objectShorthand: true
}

export default [{
    input: 'src/index.ts',
    external: ['undici', 'tslib', 'net'],
    plugins: [esbuild()],
    output: [{ 
        generatedCode, 
        file: pkg.main, 
        format: 'cjs' 
    }, {
        generatedCode,
        file: pkg.module, 
        format: 'es' 
    }]
}]