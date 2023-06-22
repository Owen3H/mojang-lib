/**  @class
 * @desc Minecraft ping packet builder
 *
 * Inspired from Cryptkeeper and wizardfrag's mc-ping
 * @see {@link https://github.com/Cryptkeeper/mc-ping-updated|mc-ping-updated repository on Github}
 *
 * Also used the wiki.vg documentation about Handshaking
 * @see {@link https://wiki.vg/Protocol|Minecraft communication protocol}
 * @see {@link https://wiki.vg/Server_List_Ping|Server List Ping}
 */
class MinecraftPacket {
  buffer = Buffer.from(new Array(1))
  cursor = 0

  writeVarInt(val) {
    do {
      var tmp = val & 0b01111111
      val >>>= 7
      tmp |= val != 0 ? 0b10000000 : 0
      this.writeUByte(tmp)
    } while (val != 0)
  }

  addToBuffer = num => {
    if (this.cursor + num > this.buffer.length) 
      this.buffer = Buffer.concat([this.buffer, Buffer.from(new Array(num))])
  }

  writeUByte(val) {
    this.addToBuffer(1)
    this.buffer.writeUInt8(val, this.cursor)
    this.cursor++
  }

  writeString(val) {
    const len = val.length
    this.writeVarInt(len)
    this.addToBuffer(len)

    this.buffer.write(val, this.cursor, len, "utf8")
    this.cursor += len
  }

  writeUShort(val) {
    this.writeUByte(val >> 8)
    this.writeUByte(val & 0b11111111)
  }

  readVarInt() {
    let cursor = 1
    let value = 0

    do {
      const read = this.buffer.readUInt8(this.cursor + cursor)
      value |= (read & 0x7F) << cursor * 7
      cursor++
    } while ((read & 0b10000000) === 128)

    this.cursor += cursor
    return value
  }

  readString() {
    const len = this.readVarInt()
    return this.buffer.toString("utf8", this.cursor, this.cursor += len)
  }

  send(socket) {
    const length_packet = new MinecraftPacket()
    length_packet.writeVarInt(this.buffer.length)
    socket.write(Buffer.concat([length_packet.buffer, this.buffer]))
  }

}

module.exports = MinecraftPacket
