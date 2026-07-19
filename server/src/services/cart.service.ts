import { AppError } from '../errors/app-error.js'
import { createAuthenticatedSupabaseClient } from '../lib/supabase.js'

interface CartItemRow {
  id: number
  product_id: number
  quantity: number
  created_at: string
  updated_at: string
}

export interface CartItem {
  id: number
  productId: number
  quantity: number
  createdAt: string
  updatedAt: string
}

const toCartItem = (row: CartItemRow): CartItem => ({
  id: row.id,
  productId: row.product_id,
  quantity: row.quantity,
  createdAt: row.created_at,
  updatedAt: row.updated_at,
})

const databaseError = (message: string) => new AppError(message, 502)

export const getCartItems = async (
  userId: string,
  accessToken: string,
): Promise<CartItem[]> => {
  const client = createAuthenticatedSupabaseClient(accessToken)
  const { data, error } = await client
    .from('cart_items')
    .select('id, product_id, quantity, created_at, updated_at')
    .eq('user_id', userId)
    .order('created_at', { ascending: true })

  if (error) throw databaseError('Unable to load your cart right now.')

  return (data as CartItemRow[]).map(toCartItem)
}

export const addCartItem = async (
  userId: string,
  accessToken: string,
  productId: number,
  quantity: number,
): Promise<CartItem> => {
  const client = createAuthenticatedSupabaseClient(accessToken)
  const { data, error } = await client
    .from('cart_items')
    .upsert(
      { user_id: userId, product_id: productId, quantity },
      { onConflict: 'user_id,product_id' },
    )
    .select('id, product_id, quantity, created_at, updated_at')
    .single()

  if (error || !data) throw databaseError('Unable to add this item to your cart.')

  return toCartItem(data as CartItemRow)
}

export const removeCartItem = async (
  userId: string,
  accessToken: string,
  productId: number,
): Promise<void> => {
  const client = createAuthenticatedSupabaseClient(accessToken)
  const { error } = await client
    .from('cart_items')
    .delete()
    .eq('user_id', userId)
    .eq('product_id', productId)

  if (error) throw databaseError('Unable to remove this item from your cart.')
}
