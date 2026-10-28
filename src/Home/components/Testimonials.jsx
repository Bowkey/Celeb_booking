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
    <section className="home-testimonials">
      <div className="max-w-7xl mx-auto px-5">
        <div className="home-section-heading">
          <span className="home-section-eyebrow">
            NOTES FROM THE CROWD
          </span>
          <h2>
            Moments that <span>stay with you.</span>
          </h2>
          <p>Every great event starts with the feeling you want people to take home.</p>
        </div>

        <div className="home-testimonial-grid">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="home-testimonial-card"
            >
              <div className="home-stars" aria-label="5 out of 5 stars">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className="h-4 w-4 fill-current"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                ))}
              </div>
              <p className="home-quote">“{t.quote}”</p>
              <div className="home-reviewer">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="h-11 w-11 rounded-full object-cover"
                />
                <div>
                  <div className="home-reviewer-name">{t.name}</div>
                  <div className="home-reviewer-role">{t.role}</div>
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
