## List of Changes (From original `minecraft-lib`)

### ✅ General QoL
- Package size reduction of over **150%** by removing `minecraft-data` and `js-base64`.
- `MCAPI_MISC` export removed as its features were deprecated.
- Type declarations included for clarity and easier debugging.

### ✅ Fixed vulnerabilities<br>
- Dependency `request` no longer used as it was unmaintained.
- Fixed 12 high level issues through `npm audit fix`
- Leveraged Typescript `readonly` to prevent overriding class properties.

### ✅ Improved performance<br>
- Deprecated `request` dependency replaced with [Undici](https://github.com/nodejs/undici) for much better latency & throughput.
- Reduced slow `for in` and `for of` loops with optimized alternatives.
- `Map` now used over built-in object (where applicable).
- All cases of `var` changed to its modern `let` or `const` counterpart.
- Prevented unnecessary object creation in some areas.

### ✅ ESM Syntax
- Set `package.json` type to `module`.
- Used `import/export` instead of `require`.
- Promise chaining replaced with `async/await`.
- Cleaner methods using arrow functions.
- Nullish coalescing & chaining now preferred.