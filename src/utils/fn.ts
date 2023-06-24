const Base64 = {
    encode: (data: any) => Buffer.from(data, 'utf8').toString('base64'),
    decode: (data: string) => Buffer.from(data, 'base64').toString('utf-8')
}

export {
    Base64
}