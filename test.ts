import MCAPI from "./src/index.js"

const server = await MCAPI.servers.get('play.earthmc.net')
console.log(server)

const player = await MCAPI.players.get('Owen3H')
console.log(player)