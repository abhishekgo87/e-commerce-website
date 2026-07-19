import { FaHeart, FaLightbulb, FaPeopleCarry, FaShieldAlt, FaStar } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { collectionImages } from '../utils/productImage'

const values = [
  { icon: FaLightbulb, title: 'Useful over trendy', text: 'We choose products that solve a real need and continue to feel relevant.' },
  { icon: FaShieldAlt, title: 'Trust in every detail', text: 'Clear information, fair value and dependable support guide every decision.' },
  { icon: FaHeart, title: 'Shopping with warmth', text: 'Good service should feel human, thoughtful and refreshingly straightforward.' },
]

const About = () => (
  <div className="about-page">
    <section className="page-hero about-hero">
      <div>
        <span className="eyebrow"><FaStar /> Our story</span>
        <h1>We make discovering good products feel simple again.</h1>
        <p>ShopEase brings style, technology and everyday essentials together in one thoughtfully curated space.</p>
      </div>
      <div className="about-collage" aria-label="A selection of ShopEase products">
        <img src={collectionImages.mens} alt="Men's clothing collection" />
        <img src={collectionImages.jewellery} alt="Jewellery collection" />
        <img src={collectionImages.electronics} alt="Electronics collection" />
      </div>
    </section>

    <section className="story-section">
      <div className="story-number">01</div>
      <div>
        <span className="eyebrow">Why we started</span>
        <h2>Less searching. More finding.</h2>
      </div>
      <p>Online shopping can feel crowded and impersonal. We started ShopEase with a simpler idea: bring together a smaller, more useful selection and explain why each product deserves your attention.</p>
    </section>

    <section className="about-stats">
      <div><strong>4</strong><span>focused collections</span></div>
      <div><strong>20+</strong><span>curated products</span></div>
      <div><strong>7 days</strong><span>easy returns</span></div>
      <div><strong>Every day</strong><span>customer support</span></div>
    </section>

    <section className="values-section">
      <div className="section-heading compact">
        <div><span className="eyebrow">What guides us</span><h2>Our values are practical</h2></div>
        <p>No complicated promises—just a better, more considered way to shop.</p>
      </div>
      <div className="values-grid">
        {values.map(({ icon: Icon, title, text }) => (
          <article className="value-card" key={title}>
            <span><Icon /></span><h3>{title}</h3><p>{text}</p>
          </article>
        ))}
      </div>
    </section>

    <section className="about-cta">
      <FaPeopleCarry />
      <div><span className="eyebrow">Made for real people</span><h2>Ready to find your next favourite?</h2></div>
      <Link to="/products" className="primary-button">Explore the collection</Link>
    </section>
  </div>
)

export default About
