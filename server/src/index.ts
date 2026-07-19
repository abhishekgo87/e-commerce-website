import app from './app.js'
import { env } from './config/env.js'

const server = app.listen(env.port, () => {
  console.log(`ShopEase API listening on http://localhost:${env.port}`)
})

const shutdown = (signal: NodeJS.Signals) => {
  console.log(`${signal} received. Closing HTTP server.`)

  server.close((error) => {
    if (error) {
      console.error('HTTP server shutdown failed', error)
      process.exit(1)
    }

    process.exit(0)
  })
}

process.on('SIGINT', shutdown)
process.on('SIGTERM', shutdown)

