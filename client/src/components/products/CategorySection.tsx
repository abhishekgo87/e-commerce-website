import productList from '../../data/productList'
import { ProductCard } from './ProductCard'

interface CategorySectionProps {
  category: string
}

const categoryDescriptions: Record<string, string> = {
  "men's clothing": 'Relaxed wardrobe staples, smart layers and dependable everyday style.',
  "women's clothing": 'Versatile layers and easy silhouettes for workdays, weekends and everything between.',
  electronics: 'Practical technology that improves your desk, entertainment and everyday workflow.',
  jewelery: 'Polished details and timeless pieces made to elevate every outfit.',
}

export const CategorySection = ({ category }: CategorySectionProps) => {
  const products = productList.filter((product) => product.category === category)
  const categoryLabel = category === 'jewelery' ? 'Jewellery' : category

  return (
    <section className="category-layout">
      <div className="category-section-heading">
        <div>
          <span className="eyebrow">{products.length} curated picks</span>
          <h2>{categoryLabel}</h2>
          <p>{categoryDescriptions[category]}</p>
        </div>
      </div>
      <div className="product-list">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  )
}

