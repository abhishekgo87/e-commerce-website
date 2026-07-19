import {
  FaArrowRight,
  FaGem,
  FaHeadset,
  FaLaptop,
  FaShieldAlt,
  FaShoppingBag,
  FaStar,
  FaTshirt,
  FaUndoAlt,
} from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { collectionImages } from '../utils/productImage'

const categories = [
  {
    name: "Men's Clothing",
    eyebrow: 'Everyday style',
    description: 'Easy layers and wardrobe essentials made for repeat wear.',
    icon: FaTshirt,
    image: collectionImages.mens,
    path: "/products/men's%20clothing",
  },
  {
    name: "Women's Clothing",
    eyebrow: 'Fresh favourites',
    description: 'Comfortable silhouettes that move from workday to weekend.',
    icon: FaShoppingBag,
    image: collectionImages.womens,
    path: "/products/women's%20clothing",
  },
  {
    name: 'Electronics',
    eyebrow: 'Smarter everyday',
    description: 'Reliable tech and useful upgrades for home, work and play.',
    icon: FaLaptop,
    image: collectionImages.electronics,
    path: '/products/electronics',
  },
  {
    name: 'Jewellery',
    eyebrow: 'Little luxuries',
    description: 'Polished pieces that add a thoughtful finish to every look.',
    icon: FaGem,
    image: collectionImages.jewellery,
    path: '/products/jewelery',
  },
]

const benefits = [
  {
    icon: FaShieldAlt,
    title: 'Quality checked',
    description: 'Every collection is selected for value, usefulness and lasting appeal.',
  },
  {
    icon: FaShoppingBag,
    title: 'Curated variety',
    description: 'Fashion, jewellery and tech without the endless-scroll overwhelm.',
  },
  {
    icon: FaUndoAlt,
    title: 'Easy returns',
    description: 'Changed your mind? Start a simple return within seven days.',
  },
  {
    icon: FaHeadset,
    title: 'Human support',
    description: 'Helpful answers from a real support team, seven days a week.',
  },
]

const Home = () => (
  <div className="home-page">
    <section className="hero-section">
      <div className="hero-copy">
        <span className="eyebrow"><FaStar /> Curated for your everyday</span>
        <h1>Style your life.<br /><em>Upgrade your everyday.</em></h1>
        <p>
          Discover wearable fashion, thoughtful accessories and useful technology—
          selected to make everyday shopping feel refreshingly simple.
        </p>
        <div className="hero-actions">
          <Link to="/products" className="primary-button">
            Shop the collection <FaArrowRight />
          </Link>
          <a href="#categories" className="secondary-button">Explore categories</a>
        </div>
        <div className="hero-proof">
          <div><strong>20+</strong><span>curated finds</span></div>
          <div><strong>4.7/5</strong><span>shopper rating</span></div>
          <div><strong>7 days</strong><span>easy returns</span></div>
        </div>
      </div>

      <div className="hero-visual" aria-label="Featured fashion, jewellery and electronics">
        <div className="hero-orbit hero-orbit-one" />
        <div className="hero-orbit hero-orbit-two" />
        <article className="hero-product hero-product-main">
          <span>Fresh style</span>
          <img src={collectionImages.womens} alt="Women's clothing collection" />
        </article>
        <article className="hero-product hero-product-small hero-product-tech">
          <img src={collectionImages.electronics} alt="Modern electronics collection" />
          <span>Smart tech</span>
        </article>
        <article className="hero-product hero-product-small hero-product-jewel">
          <img src={collectionImages.jewellery} alt="Gold jewellery collection" />
          <span>Fine details</span>
        </article>
        <div className="hero-rating"><FaStar /> 4.7 loved by shoppers</div>
      </div>
    </section>

    <section className="categories-section" id="categories">
      <div className="section-heading">
        <div>
          <span className="eyebrow">Shop your way</span>
          <h2>Something for every side of you</h2>
        </div>
        <p>Browse focused collections with the right products and imagery for every category.</p>
      </div>

      <div className="category-grid">
        {categories.map(({ name, eyebrow, description, icon: Icon, image, path }) => (
          <Link to={path} key={name} className="category-card">
            <div className="category-image-wrap">
              <img src={image} alt={`${name} collection`} />
              <span className="category-icon"><Icon /></span>
            </div>
            <div className="category-copy">
              <small>{eyebrow}</small>
              <h3>{name}</h3>
              <p>{description}</p>
              <span className="explore-text">Explore collection <FaArrowRight /></span>
            </div>
          </Link>
        ))}
      </div>
    </section>

    <section className="editorial-banner">
      <div className="editorial-image">
        <img src={collectionImages.electronics} alt="Premium electronics collection" />
        <span>Editor&apos;s pick</span>
      </div>
      <div className="editorial-copy">
        <span className="eyebrow">Designed around real life</span>
        <h2>Useful finds. Honest value. No unnecessary noise.</h2>
        <p>
          We bring together products that look good, work hard and earn their place
          in your routine—from an effortless jacket to a desk setup you enjoy using.
        </p>
        <Link to="/about" className="text-link">Why ShopEase is different <FaArrowRight /></Link>
      </div>
    </section>

    <section className="benefits-section">
      <div className="section-heading compact">
        <div>
          <span className="eyebrow">The ShopEase promise</span>
          <h2>Good shopping should feel easy</h2>
        </div>
      </div>
      <div className="benefits-grid">
        {benefits.map(({ icon: Icon, title, description }) => (
          <article className="benefit-card" key={title}>
            <span><Icon /></span>
            <h3>{title}</h3>
            <p>{description}</p>
          </article>
        ))}
      </div>
    </section>

    <section className="newsletter-section">
      <div>
        <span className="eyebrow">A better inbox</span>
        <h2>New drops, useful picks and nothing noisy.</h2>
      </div>
      <form onSubmit={(event) => event.preventDefault()} className="newsletter-form">
        <label className="sr-only" htmlFor="newsletter-email">Email address</label>
        <input id="newsletter-email" type="email" placeholder="you@example.com" required />
        <button type="submit">Keep me posted <FaArrowRight /></button>
      </form>
    </section>
  </div>
)

export default Home
