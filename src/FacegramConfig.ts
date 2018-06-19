import fs = require('fs')
import log from 'npmlog'
import { IFacegramConnection } from './models'

const CONFIG_FILE_PATH = './config.json'

const DEFAULT_CONFIG = {
  loadedServices: [],
  services: {
    telegram: {
      enabled: false,
      masterMode: false,
      apiId: 'telegram account apiId',
      apiHash: 'telegram account apiHash',
      phoneNumber: 'telegram account phone number',
      telegramUsername: 'telegram account username',
      botToken: 'bot token from botfather',
    },

    facebook: {
      enabled: false,
      email: 'account email',
      password: 'account password',
      forceLogin: true,
    },

    discord: {
      enabled: false,
      token: 'discord bot token',
    },
  },

  serviceConnections: [],

  logLevel: 'info',
}
export class FacegramConfig {
  jsonConfig: any

  readConfig() {
    // Read config
    this.jsonConfig = JSON.parse(fs.readFileSync(CONFIG_FILE_PATH, 'utf-8'))
    if (this.jsonConfig.logLevel) log.level = this.jsonConfig.logLevel
    if (process.env.LOG_LEVEL) log.level = process.env.LOG_LEVEL
  }

  configExists() {
    return fs.existsSync(CONFIG_FILE_PATH)
  }

  getConfigForServiceName(name: string) {
    return this.jsonConfig['services'][name]
  }

  getLoadedServices(): string[] {
    return this.jsonConfig.loadedServices
  }

  getThreadConnections(): IFacegramConnection[] {
    return this.jsonConfig['serviceConnections']
  }

  writeConfig(config: any) {
    fs.writeFileSync(CONFIG_FILE_PATH, JSON.stringify(config, null, 2))
  }
}
