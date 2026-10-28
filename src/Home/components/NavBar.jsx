import { useState } from "react";
import { Link, NavLink } from "react-router";

const links = [
  { to: "/", label: "Home", end: true },
  { to: "/celebrities", label: "Celebrities" },
  { to: "/services", label: "Services" },
  { to: "/about", label: "About" },
];

function NavBar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="modern-nav">
      <div className="modern-nav-inner">
        <Link to="/" className="modern-brand" onClick={() => setMobileMenuOpen(false)}>
          <span className="modern-brand-mark"><img src="/favicon.svg" alt="" /></span>
          <span>My<span>Star</span>Booking</span>
        </Link>

        <nav className={`modern-nav-links ${mobileMenuOpen ? "modern-nav-open" : ""}`} aria-label="Main navigation">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) => `modern-nav-link${isActive ? " modern-nav-active" : ""}`}
            >
              {link.label}
            </NavLink>
          ))}
          <Link to="/booking" className="modern-mobile-book" onClick={() => setMobileMenuOpen(false)}>
            Start a booking <span aria-hidden="true">↗</span>
          </Link>
        </nav>

        <div className="modern-nav-actions">
          <Link to="/booking" className="modern-book-button">
            Start a booking <span aria-hidden="true">↗</span>
          </Link>
          <button
            type="button"
            className="modern-menu-button"
            aria-label={mobileMenuOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={mobileMenuOpen}
            onClick={() => setMobileMenuOpen((open) => !open)}
          >
            {mobileMenuOpen ? (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18" /></svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16" /></svg>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}

export default NavBar;
