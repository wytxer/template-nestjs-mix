import { existsSync, readFileSync } from 'fs'
import * as yaml from 'js-yaml'
import { join } from 'path'
import * as merge from 'lodash.merge'

const envFileName = {
  local: ['common.local', 'admin.local'],
  test: ['common.test', 'admin.test'],
  online: ['common.online', 'admin.online']
}

const env = process.env.NODE_ENV || 'test'

export default () => {
  const cwdPath = join(process.cwd(), '../../config')
  // 检查配置文件是否存在
  const configs: string[] = []
  envFileName[env].forEach((fileName: string) => {
    const filePath = join(cwdPath, `${fileName}.yaml`)
    if (existsSync(filePath)) {
      configs.push(filePath)
    } else {
      throw new Error(`配置文件未找到：${filePath}`)
    }
  })
  const config = merge({}, ...configs.map((filePath: string) => yaml.load(readFileSync(filePath, 'utf8'))))
  if (config.crypto.rsa.publicPath && config.crypto.rsa.privatePath) {
    // 公钥
    config.crypto.rsa.publicKey = readFileSync(join(cwdPath, config.crypto.rsa.publicPath))
    // 私钥
    config.crypto.rsa.privateKey = readFileSync(join(cwdPath, config.crypto.rsa.privatePath))
  }
  return config
}
