/* eslint-disable @typescript-eslint/no-var-requires */
const crypto = require('crypto')
const fs = require('fs')

// 生成 RSA 密钥对
crypto.generateKeyPair(
  'rsa',
  {
    // 密钥长度
    modulusLength: 2048,
    publicKeyEncoding: {
      type: 'spki',
      format: 'pem'
    },
    privateKeyEncoding: {
      type: 'pkcs8',
      format: 'pem'
    }
  },
  (error, publicKey, privateKey) => {
    if (error) {
      console.error('密钥对生成失败')
      console.error(error)
      return
    }
    fs.writeFileSync('public.pem', publicKey)
    fs.writeFileSync('private.pem', privateKey)
    console.log('密钥对生成成功')
  }
)
