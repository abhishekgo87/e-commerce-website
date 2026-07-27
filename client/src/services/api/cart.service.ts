import { supabase } from '../../lib/supabase'

export interface CartApiItem {
  id: number
  productId: number
  quantity: number
  createdAt: string
  updatedAt: string
}

interface CartResponse {
  items: CartApiItem[]
}

interface CartItemResponse {
  item: CartApiItem
}

const toCartItem = (row: any): CartApiItem => ({
  id: row.id,
  productId: row.product_id,
  quantity: row.quantity,
  createdAt: row.created_at,
  updatedAt: row.updated_at,
})

export const getCart = async (): Promise<CartResponse> => {
  const { data: userResponse, error: userError } = await supabase.auth.getUser()

  if (userError || !userResponse.user) {
    throw new Error(userError?.message ?? 'Your session is invalid or has expired.')
  }

  const { data, error } = await supabase
    .from('cart_items')
    .select('*')
    .eq('user_id', userResponse.user.id)
    .order('created_at', { ascending: true })

  if (error) {
    throw new Error(error.message)
  }

  return { items: (data || []).map(toCartItem) }
}

export const addCartItem = async (
  productId: number,
): Promise<CartItemResponse> => {
  const { data: userResponse, error: userError } = await supabase.auth.getUser()

  if (userError || !userResponse.user) {
    throw new Error(userError?.message ?? 'Your session is invalid or has expired.')
  }

  const { data, error } = await supabase
    .from('cart_items')
    .upsert(
      { user_id: userResponse.user.id, product_id: productId, quantity: 1 },
      { onConflict: 'user_id,product_id' }
    )
    .select()
    .single()

  if (error) {
    throw new Error(error.message)
  }

  return { item: toCartItem(data) }
}

export const removeCartItem = async (
  productId: number,
): Promise<void> => {
  const { data: userResponse, error: userError } = await supabase.auth.getUser()

  if (userError || !userResponse.user) {
    throw new Error(userError?.message ?? 'Your session is invalid or has expired.')
  }

  const { error } = await supabase
    .from('cart_items')
    .delete()
    .eq('user_id', userResponse.user.id)
    .eq('product_id', productId)

  if (error) {
    throw new Error(error.message)
  }
}
