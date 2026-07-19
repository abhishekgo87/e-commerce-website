import { Router } from 'express'
import { cartRouter } from './cart.routes.js'
import { healthRouter } from './health.routes.js'

export const apiRouter = Router()

apiRouter.use('/health', healthRouter)
apiRouter.use('/cart', cartRouter)
