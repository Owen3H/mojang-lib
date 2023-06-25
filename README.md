# mojang-lib ![GitHub repo size](https://img.shields.io/github/repo-size/Owen3H/mojang-lib)
A modern wrapper for interacting with the Mojang API.<br><p>
This library is a rewritten version of [minecraft-lib](https://github.com/Emrio/minecraft-js) in Typescript.<br>
The list of changes made are available [here](/CHANGES.md).

## Install
```bash
npm i mojang-lib
```

## Usage

### ESM
```js
import MCAPI from "mojang-lib"

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