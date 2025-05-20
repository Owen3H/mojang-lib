import { Socket } from "net"

/** 
 *  @internal
 *  Minecraft ping packet builder.
 *
 *  Also used the wiki.vg documentation about Handshaking.
 *  @see {@link https://wiki.vg/Protocol Minecraft Communication Protocol}
 *  @see {@link https://wiki.vg/Server_List_Ping Server List Ping}
 */
class MinecraftPacket {
  #buffer = Buffer.from(new Array(1))
  get buffer() { return this.#buffer }
  
  #cursor = 0
  get cursor() { return this.#cursor }

  writeVarInt(val: number) {
    do {
      var tmp = val & 0b01111111
      val >>>= 7
      tmp |= val != 0 ? 0b10000000 : 0
      this.writeUByte(tmp)
    } while (val != 0)
  }

  addToBuffer = (num: number) => {
    const exceeds = (this.cursor + num) > this.buffer.length
    if (!exceeds) return

    const buf = Buffer.from(new Array(num))
    this.appendData(buf)
  }

  appendData(data: Buffer) {
    this.#buffer = Buffer.concat([this.#buffer, data])
  } 

  writeUByte(val: number) {
    this.addToBuffer(1)
    this.#buffer.writeUInt8(val, this.cursor)
    this.#cursor++
  }

  writeString(val: string) {
    const len = val.length
    this.writeVarInt(len)
    this.addToBuffer(len)

    this.buffer.write(val, this.cursor, len, "utf8")
    this.#cursor += len
  }

  writeUShort(val: any) {
    this.writeUByte(val >> 8)
    this.writeUByte(val & 0b11111111)
  }

  readVarInt() {
    let read: number

    let cursor = 1
    let value = 0

    do {
      read = this.buffer.readUInt8(this.cursor + cursor)
      value |= (read & 0x7F) << cursor * 7
      cursor++
    } while ((read & 0b10000000) === 128)

    this.#cursor += cursor
    return value
  }

  readString() {
    const len = this.readVarInt()
    return this.buffer.toString("utf8", this.cursor, this.#cursor += len)
  }

  send(socket: Socket) {
    const length_packet = new MinecraftPacket()
    length_packet.writeVarInt(this.buffer.length)

    const mergedBuf = Buffer.concat([length_packet.buffer, this.buffer])
    socket.write(mergedBuf)
  }
}

export {
  MinecraftPacket,
  MinecraftPacket as default
} 
