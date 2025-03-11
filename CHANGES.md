## List of Changes (From original `minecraft-lib`)

### ⬜ General QoL
- Removed big `minecraft-data` dependency and replaced `js-base64` with built-in alternative.
- `MCAPI_MISC` export removed as its features were deprecated.
- Type declarations included for clarity and easier debugging.

### ⬜ Fixed vulnerabilities
- Dependency `request` no longer used as it was unmaintained.
- Fixed 12 high level issues via `npm audit fix`.

### ⬜ Improved perf/safety
- Deprecated `request` dependency replaced with [Undici](https://github.com/nodejs/undici) for much better latency & throughput.
- Reduced slow `for in` and `for of` loops with optimized alternatives.
- `Map` now used over built-in object (where applicable).
- All cases of `var` changed to its modern `let` or `const` counterpart.
- Prevented unnecessary object creation in some areas.

### ⬜ ESM Syntax
- Set `package.json` type to `module`.
- Used `import/export` instead of `require`.
- Promise chaining replaced with `async/await`.
