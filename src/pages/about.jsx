import { Link } from 'react-router-dom'

export default function About() {
  return (
    <div className="about-page-container">
      <img src="/about.jpg" className="about-hero-image" />
      <div className="about-page-content">
        <h1>Don’t squeeze in a sedan when you could relax in a van.</h1>
        <h3>Our mission is to enliven your road trip with the perfect travel van.</h3>
        <h3>All of our vans are certified before every rental to ensure your travel plans go off without a hitch.</h3>
        <h3>Our team is full of experts who know firsthand the magic of touring the world on four wheels.</h3>
      </div>
      <div className="about-page-cta">
        <h2>
          Your destination is waiting.
          <br />
          Your van is ready.
        </h2>
        <Link className="link-button" to="/vans">
          Explore our vans
        </Link>
      </div>
    </div>
  )
}
