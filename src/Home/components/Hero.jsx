import { Link } from "react-router";

function Hero() {
  return (
    <section className="home-hero">
      <div className="home-hero-glow home-hero-glow-one" aria-hidden="true" />
      <div className="home-hero-glow home-hero-glow-two" aria-hidden="true" />
      <div className="home-hero-grid" aria-hidden="true" />
      <div className="home-hero-content">
        <p className="home-hero-eyebrow"><span /> YOUR MOMENT, AMPLIFIED</p>
        <h1>
          Turn heads.
          <span>Book the star.</span>
        </h1>
        <p className="home-hero-copy">
          Make your next event one to remember. Discover talent for celebrations,
          brand moments, live performances, and more.
        </p>
        <div className="home-hero-actions">
          <Link to="/celebrities" className="home-button-primary">
            Explore celebrities <span aria-hidden="true">↗</span>
          </Link>
          <Link to="/services" className="home-button-secondary">
            Discover our services
          </Link>
        </div>
        <div className="home-hero-proof">
          <span className="proof-avatar-stack" aria-hidden="true"><i>✦</i><i>♪</i><i>★</i></span>
          <span>From a first idea to a moment worth remembering.</span>
        </div>
      </div>
      <div className="home-hero-art" aria-hidden="true">
        <div className="hero-art-orbit hero-art-orbit-one" />
        <div className="hero-art-orbit hero-art-orbit-two" />
        <div className="hero-art-card">
          <span className="hero-art-tag">THE GUEST LIST</span>
          <div className="hero-art-star">✳</div>
          <p>Make it<br /><em>memorable.</em></p>
          <div className="hero-art-rule" />
          <div className="hero-art-footer"><span>MAKE YOUR MOMENT</span><span>✦</span></div>
        </div>
        <span className="hero-art-float hero-art-float-top">A little more unforgettable</span>
        <span className="hero-art-float hero-art-float-bottom"><i /> Your event starts here</span>
      </div>
      <div className="home-hero-footer"><span>DISCOVER</span><i /><span>01 — 03</span></div>
    </section>
  );
}

export default Hero;
