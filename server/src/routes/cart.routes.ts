import { Router } from 'express'
import { addToCart, deleteFromCart, getCart } from '../controllers/cart.controller.js'
import { requireAuth } from '../middleware/auth.middleware.js'

export const cartRouter = Router()

cartRouter.use(requireAuth)
cartRouter.get('/', getCart)
cartRouter.post('/', addToCart)
cartRouter.delete('/:productId', deleteFromCart)
