import { Link } from "react-router";

function NavBar() {
  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-gradient-to-b from-black/90 via-black/80 to-transparent px-5">
      <div className="max-w-7xl mx-auto flex items-center justify-between h-20">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-linear-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center shadow-lg shadow-blue-500/30 group-hover:scale-110 transition-transform">
            <img src="/favicon.svg" alt="" className="h-6 w-6" />
          </div>
          <span className="text-2xl font-bold text-white tracking-tight">
            My<span className="text-blue-400">Star</span>Booking
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-white/80">
          <Link to="/" className="hover:text-blue-400 transition-colors">
            Home
          </Link>
          <Link to="/celebrities" className="hover:text-blue-400 transition-colors">
            Celebrities
          </Link>
          <Link to="/services" className="hover:text-blue-400 transition-colors">
            Services
          </Link>
          <Link to="/about" className="hover:text-blue-400 transition-colors">
            About
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <button className="hidden md:inline-flex items-center gap-2 px-6 py-2.5 bg-blue-400 hover:bg-blue-300 text-black font-semibold rounded-full transition-all hover:scale-105 shadow-lg shadow-blue-500/30">
            <svg
              className="w-5 h-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
            </svg>
            Book Now
          </button>
          <button className="md:hidden text-white p-2">
            <svg
              className="w-6 h-6"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}

export default NavBar;
