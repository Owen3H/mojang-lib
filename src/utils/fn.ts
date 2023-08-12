/**
 * @internal
 */
const Base64 = {
    encode: (data: any) => Buffer.from(data, 'utf8').toString('base64'),
    decode: (data: string) => Buffer.from(data, 'base64').toString('utf-8')
}

const isNode = () => typeof process !== "undefined" && process?.versions?.node
 
export {
    Base64, isNode
}