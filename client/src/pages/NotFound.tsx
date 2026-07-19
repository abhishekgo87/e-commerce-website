import { FaArrowLeft, FaCompass } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const NotFound = () => (
  <section className="not-found-page">
    <div className="not-found-copy">
      <span><FaCompass /></span>
      <small>Error 404</small>
      <h1>Looks like this aisle doesn&apos;t exist.</h1>
      <p>The page may have moved, but there are plenty of great finds waiting back at ShopEase.</p>
      <Link to="/" className="primary-button"><FaArrowLeft /> Back to home</Link>
    </div>
    <img src="/images/generated/not-found.png" alt="Shopping bag and compass in an empty aisle" />
  </section>
)

export default NotFound
