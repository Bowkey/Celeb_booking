import { Link } from "react-router";

function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-black overflow-hidden pt-20">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSi4P3cV7YnI0oJObEdGdtvq4YjIx2DOprFMpNvKEPSnw&s=10'), linear-gradient(to bottom, rgba(0,0,0,0.7), rgba(0,0,0,0.9))",
        }}
      ></div>

      {/* Overlay Gradient Accents */}
      <div className="absolute inset-0 bg-linear-to-b from-black/40 via-transparent to-black/60"></div>

      {/* Decorative Orbits */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-150 h-150 rounded-full border border-blue-500/10 animate-spin"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full border border-blue-500/5"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-5 text-center">
     

        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-tight mb-6">
          Turn Heads.
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">
            Book the Star.
          </span>
        </h1>

        <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-10 leading-relaxed">
          The premier platform to hire top celebrities for your events,
          weddings, and parties. From influencers to A-list performers — find
          and book your star today.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/booking"
            className="inline-flex items-center gap-2 px-8 py-4 bg-blue-400 hover:bg-blue-300 text-black font-semibold rounded-full transition-all hover:scale-105 shadow-2xl shadow-blue-500/40 text-lg"
          >
            <svg
              className="w-6 h-6"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
            </svg>
            Book Your Star
          </Link>
          <Link
            to="/celebrities"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-full transition-all border border-white/20 backdrop-blur-sm text-lg"
          >
            Explore Celebrities
            <svg
              className="w-5 h-5 transition-transform group-hover:translate-x-1"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-3 gap-8 max-w-lg mx-auto">
          <div>
            <div className="text-3xl font-bold text-blue-400">500+</div>
            <div className="text-sm text-gray-400 mt-1">Celebrities</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-blue-400">10k+</div>
            <div className="text-sm text-gray-400 mt-1">Events Booked</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-blue-400">50k+</div>
            <div className="text-sm text-gray-400 mt-1">Happy Clients</div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/60 animate-bounce">
        <svg
          className="w-6 h-6"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </div>
    </section>
  );
}

export default Hero;
