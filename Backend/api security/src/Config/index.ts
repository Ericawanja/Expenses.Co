import dotenv from 'dotenv'

import path from 'path'
import assert from 'assert'

dotenv.config({path:path.resolve(__dirname, '../../.env')})
assert(process.env.DB_USER, "Please the db user in the environment variable")
export const sqlConfig = {
  user: process.env.DB_USER as string ,
  password: process.env.DB_PWD as string,
  database: process.env.DB_NAME as string,
  server: 'localhost',
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000
  },
  options: {
    encrypt: false, // for azure
    trustServerCertificate: false // change to true for local dev / self-signed certs
  }
}

