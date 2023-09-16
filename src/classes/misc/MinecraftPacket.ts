import { Socket } from "net"

/** 
 *  @internal
 *  Minecraft ping packet builder
 *
 *  Also used the wiki.vg documentation about Handshaking
 *  @see {@link https://wiki.vg/Protocol Minecraft Communication Protocol}
 *  @see {@link https://wiki.vg/Server_List_Ping Server List Ping}
 */
class MinecraftPacket {
  _buffer = Buffer.from(new Array(1))
  get buffer() { return this._buffer }

  _cursor = 0
  get cursor() { return this._cursor }

  writeVarInt(val: number) {
    do {
      var tmp = val & 0b01111111
      val >>>= 7
      tmp |= val != 0 ? 0b10000000 : 0
      this.writeUByte(tmp)
    } while (val != 0)
  }

  addToBuffer = (num: number) => {
    if (this.cursor + num > this.buffer.length) 
      this._buffer = Buffer.concat([this.buffer, Buffer.from(new Array(num))])
  }

  writeUByte(val: number) {
    this.addToBuffer(1)
    this._buffer.writeUInt8(val, this.cursor)
    this._cursor++
  }

  writeString(val: string) {
    const len = val.length
    this.writeVarInt(len)
    this.addToBuffer(len)

    this.buffer.write(val, this.cursor, len, "utf8")
    this._cursor += len
  }

  writeUShort(val: any) {
    this.writeUByte(val >> 8)
    this.writeUByte(val & 0b11111111)
  }

  readVarInt() {
    let cursor = 1
    let value = 0

    do {
      var read = this.buffer.readUInt8(this.cursor + cursor)
      value |= (read & 0x7F) << cursor * 7
      cursor++
    } while ((read & 0b10000000) === 128)

    this._cursor += cursor
    return value
  }

  readString() {
    const len = this.readVarInt()
    return this.buffer.toString("utf8", this.cursor, this._cursor += len)
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
