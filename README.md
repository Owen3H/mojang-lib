# mojang-lib ![GitHub repo size](https://img.shields.io/github/repo-size/Owen3H/mojang-lib)
A modern wrapper for interacting with the Mojang API.<br>
This library is a rewritten version of [minecraft-lib](https://github.com/Emrio/minecraft-js) in Typescript.

### Changes
✅ Improved performance<br>

- Deprecated `request` dependency replaced with [Undici](https://github.com/nodejs/undici) for much better latency & throughput.
- Reduced slow `for in` and `for of` loops with optimized alternatives.
- `Map` now used over built-in object (where applicable).
- Prevented unnecessary object creation.
- All cases of `var` changed to its modern `let` or `const` counterpart.
  
✅ Fixed vulnerabilities<br>

- Dependency `request` no longer used as it was unmaintained.
- Fixed 12 high level issues through `npm audit fix`
- Leveraged Typescript `readonly` to prevent overriding class properties.

✅ ESM Syntax

- Set `package.json` type to `module`.
- Used `import/export` instead of `require`.
- Promise chaining replaced with `async/await`.
- Cleaner methods using arrow functions.

## Install
```bash
npm i mojang-lib
```

## Usage
Soon...
