# mojang-lib ![GitHub repo size](https://img.shields.io/github/repo-size/Owen3H/mojang-lib) ![npm bundle size](https://img.shields.io/bundlephobia/minzip/mojang-lib?label=minzip)

A modern wrapper for interacting with the Mojang API.<br><p>
This library is a rewritten version of [minecraft-lib](https://github.com/Emrio/minecraft-js) in TypeScript.<br>
The list of changes made are available [here](/CHANGES.md).

[Read the docs](https://owen3h.github.io/mojang-lib)

## Install
[Bun](https://bun.sh) - `bun add mojang-lib`\
[PNPM](https://pnpm.io/installation#using-npm) - `pnpm add mojang-lib`

## Usage

### ESM
```js
import { players, servers } from "mojang-lib"

const server = await servers.get('play.earthmc.net')
console.log(server)

const player = await players.get('Owen3H')
console.log(player)
```

### CommonJS
```js
const MCAPI = require("mojang-lib")

async function runTest() {
  const server = await MCAPI.servers.get('play.earthmc.net')
  console.log(server)

  const player = await MCAPI.players.get('Owen3H')
  console.log(player)
}

runTest()
```
