import { Socket } from "net"

/** @class
 *  @desc Minecraft ping packet builder
 *
 *  Also used the wiki.vg documentation about Handshaking
 *  @see {@link https://wiki.vg/Protocol|Minecraft communication protocol}
 *  @see {@link https://wiki.vg/Server_List_Ping|Server List Ping}
 */
class MinecraftPacket {
  buffer = Buffer.from(new Array(1))
  #cursor = 0

  writeVarInt(val: number) {
    do {
      var tmp = val & 0b01111111
      val >>>= 7
      tmp |= val != 0 ? 0b10000000 : 0
      this.writeUByte(tmp)
    } while (val != 0)
  }

  addToBuffer = (num: number) => {
    if (this.#cursor + num > this.buffer.length) 
      this.buffer = Buffer.concat([this.buffer, Buffer.from(new Array(num))])
  }

  writeUByte(val: number) {
    this.addToBuffer(1)
    this.buffer.writeUInt8(val, this.#cursor)
    this.#cursor++
  }

  writeString(val: string) {
    const len = val.length
    this.writeVarInt(len)
    this.addToBuffer(len)

    this.buffer.write(val, this.#cursor, len, "utf8")
    this.#cursor += len
  }

  writeUShort(val: any) {
    this.writeUByte(val >> 8)
    this.writeUByte(val & 0b11111111)
  }

  readVarInt() {
    let cursor = 1
    let value = 0

    do {
      var read = this.buffer.readUInt8(this.#cursor + cursor)
      value |= (read & 0x7F) << cursor * 7
      cursor++
    } while ((read & 0b10000000) === 128)

    this.#cursor += cursor
    return value
  }

  readString() {
    const len = this.readVarInt()
    return this.buffer.toString("utf8", this.#cursor, this.#cursor += len)
  }

  send(socket: Socket) {
    const length_packet = new MinecraftPacket()
    length_packet.writeVarInt(this.buffer.length)
    socket.write(Buffer.concat([length_packet.buffer, this.buffer]))
  }
}

export {
  MinecraftPacket,
  MinecraftPacket as default
} 
