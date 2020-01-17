import { Client } from 'pg'
import { Types } from 'daf-data-store'

import Debug from 'debug'
const debug = Debug('daf:node-pg')

export class NodePg implements Types.DbDriver {
  private db: Client

  constructor(config: string) {
    this.db = new Client(config)
    debug('DB %O', this.db)
  }

  async initialize() {
    const a = await this.db.connect()

    debug('a %O', a)
  }

  async run(sql: string, params: any): Promise<boolean> {
    debug('run', sql, params)
    try {
      await this.db.query({
        text: sql,
        values: params,
      })
      return true
    } catch (e) {
      debug(e)
      return false
    }
  }

  async rows(sql: string, params: any): Promise<any> {
    debug('rows', sql, params)
    try {
      const result = await this.db.query({
        text: sql,
        values: params,
      })
      return result.rows
    } catch (e) {
      debug(e)
      return false
    }
  }
}
