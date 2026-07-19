const categoryFallbacks: Record<string, string> = {
  "men's clothing": '/images/generated/mens-collection.png',
  "women's clothing": '/images/generated/womens-collection.png',
  electronics: '/images/generated/electronics-collection.png',
  jewelery: '/images/generated/jewellery-collection.png',
}

export const getProductFallbackImage = (category: string): string =>
  categoryFallbacks[category] ?? '/images/generated/empty-cart.png'

export const collectionImages = {
  mens: categoryFallbacks["men's clothing"],
  womens: categoryFallbacks["women's clothing"],
  electronics: categoryFallbacks.electronics,
  jewellery: categoryFallbacks.jewelery,
} as const

