function Testimonials() {
  const testimonials = [
    {
      quote:
        "Absolutely magical! Arianna Marie performed at our wedding and the entire venue was blown away. Our guests are still talking about it.",
      name: "Sarah & Michael",
      role: "Wedding Couple",
      avatar: "https://i.pravatar.cc/100?img=11",
    },
    {
      quote:
        "We booked David for our company gala and his comedy set had everyone in stitches. Highly recommended for corporate events.",
      name: "James Wilson",
      role: "Event Director, TechCorp",
      avatar: "https://i.pravatar.cc/100?img=22",
    },
    {
      quote:
        "The customer service was outstanding. Within 24 hours of reaching out, we had a tailor-made package with Sophia for our birthday party.",
      name: "Priya Sharma",
      role: "Birthday Party Host",
      avatar: "https://i.pravatar.cc/100?img=3",
    },
  ];

  return (
    <section className="py-20 bg-black">
      <div className="max-w-7xl mx-auto px-5">
        <div className="text-center mb-14">
          <span className="text-yellow-400 text-sm font-medium uppercase tracking-widest">
            Testimonials
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-3 mb-4">
            What Our{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">
              Clients Say
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 hover:bg-white/10 transition-all"
            >
              <div className="text-yellow-400 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-5 h-5 fill-current"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-300 text-sm leading-relaxed mb-6">"{t.quote}"</p>
              <div className="flex items-center gap-3">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-yellow-400/50"
                />
                <div>
                  <div className="text-white font-semibold text-sm">{t.name}</div>
                  <div className="text-gray-500 text-xs">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
