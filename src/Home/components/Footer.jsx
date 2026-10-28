import { Link } from "react-router";

function Footer() {
  return (
    <footer className="modern-footer">
      <div className="modern-footer-inner">
        <div className="modern-footer-main">
          <div>
            <Link to="/" className="modern-footer-brand">
              <span className="modern-footer-brand-mark"><img src="/favicon.svg" alt="" /></span>
              <span>My<span>Star</span>Booking</span>
            </Link>
            <p className="modern-footer-about">
              A place to discover talent, explore appearances, and start planning
              a moment worth remembering.
            </p>
          </div>

          <div>
            <h2>Explore</h2>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/celebrities">Celebrities</Link></li>
              <li><Link to="/services">Services</Link></li>
              <li><Link to="/about">About us</Link></li>
            </ul>
          </div>

          <div>
            <h2>Plan an appearance</h2>
            <ul>
              <li><Link to="/services">Live performances</Link></li>
              <li><Link to="/services">Meet and greets</Link></li>
              <li><Link to="/services">Speaking and hosting</Link></li>
              <li><Link to="/services">Virtual appearances</Link></li>
            </ul>
          </div>

          <div className="modern-footer-subscribe">
            <h2>Stay in the loop</h2>
            <p>Get in touch to ask about appearances and upcoming events.</p>
            <Link className="modern-footer-contact" to="/booking">
              Send a booking enquiry <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </div>

        <div className="modern-footer-bottom">
          <p>© 2026 MyStarBooking. All rights reserved.</p>
          <div className="modern-footer-legal">
            <span>Availability and fees are confirmed before booking.</span>
            <Link to="/about">How it works</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
