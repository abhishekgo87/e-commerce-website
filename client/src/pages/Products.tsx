import { FaCompass, FaLayerGroup, FaSlidersH } from 'react-icons/fa'
import { Link, useParams } from 'react-router-dom'
import { CategorySection } from '../components/products/CategorySection'
import productList from '../data/productList'
import { getProductCategories } from '../utils/productCategories'

const Products = () => {
  const { category } = useParams()
  const categories = getProductCategories()
  const selectedCategory = category ? decodeURIComponent(category) : undefined
  const visibleCategories = selectedCategory ? [selectedCategory] : categories

  return (
    <div className="products-page">
      <section className="page-hero products-hero">
        <div>
          <span className="eyebrow"><FaCompass /> The complete collection</span>
          <h1>Find your next everyday favourite.</h1>
          <p>Explore curated fashion, jewellery and electronics chosen for style, usefulness and honest value.</p>
        </div>
        <div className="page-hero-stat">
          <FaLayerGroup />
          <strong>{productList.length}</strong>
          <span>handpicked products</span>
        </div>
      </section>

      <div className="filter-panel">
        <span className="filter-label"><FaSlidersH /> Filter collection</span>
        <div className="category-filters">
          <Link
            to="/products"
            className={`category-filter ${!selectedCategory ? 'active' : ''}`}
          >
            All products
          </Link>
          {categories.map((categoryName) => (
            <Link
              key={categoryName}
              to={`/products/${encodeURIComponent(categoryName)}`}
              className={`category-filter ${categoryName === selectedCategory ? 'active' : ''}`}
            >
              {categoryName === 'jewelery' ? 'Jewellery' : categoryName}
            </Link>
          ))}
        </div>
      </div>

      {visibleCategories.map((categoryName) => (
        <CategorySection key={categoryName} category={categoryName} />
      ))}
    </div>
  )
}

export default Products

