import MCAPI from "./src/index.js"

const server = await MCAPI.servers.get('play.earthmc.net')
if (server) console.log(server.players)