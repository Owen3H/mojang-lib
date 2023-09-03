# mojang-lib ![GitHub repo size](https://img.shields.io/github/repo-size/Owen3H/mojang-lib)
A modern wrapper for interacting with the Mojang API.<br><p>
This library is a rewritten version of [minecraft-lib](https://github.com/Emrio/minecraft-js) in Typescript.<br>
The list of changes made are available [here](/CHANGES.md).

[Read the docs](https://owen3h.github.io/mojang-lib)

## Install
```bash
pnpm add mojang-lib
```

## Usage

### ESM
```js
import { players, servers } from "mojang-lib"

const server = await MCAPI.servers.get('play.earthmc.net')
console.log(server)

const player = await MCAPI.players.get('Owen3H')
console.log(player)
```

### CommonJS
```js
const { MCAPI } = require("mojang-lib")

const runTest = async () => {
  const server = await MCAPI.servers.get('play.earthmc.net')
  console.log(server)

  const player = await MCAPI.players.get('Owen3H')
  console.log(player)
}

runTest()
```
