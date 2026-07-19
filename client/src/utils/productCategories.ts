import productList from '../data/productList'

export const getProductCategories = (): string[] => [
  ...new Set(productList.map((product) => product.category)),
]

