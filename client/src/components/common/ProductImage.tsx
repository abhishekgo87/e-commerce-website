import type { ImgHTMLAttributes } from 'react'
import type { Product } from '../../types/product'
import { getProductFallbackImage } from '../../utils/productImage'

interface ProductImageProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'src'> {
  product: Product
}

export const ProductImage = ({ product, alt, onError, ...imageProps }: ProductImageProps) => {
  return (
    <img
      {...imageProps}
      src={getProductFallbackImage(product.category)}
      alt={alt ?? product.title}
      onError={onError}
    />
  )
}
