import { Link } from "react-router";

function Services() {
  const services = [
    {
      title: "Live Performances",
      description:
        "Watch your event come alive with live singing, dancing, and performances by the best talent.",
      icon: "🎤",
      color: "violet",
    },
    {
      title: "Destination Events",
      description:
        "Celebrity packages for destination weddings, award shows, and exclusive corporate events.",
      icon: "✈️",
      color: "amber",
    },
    {
      title: "Social Media Stars",
      description:
        "Influence your audience with popular creators who dominate the social media scene.",
      icon: "📱",
      color: "rose",
    },
    {
      title: "Corporate Events",
      description:
        "Speakers, entertainers, and emcees that make your corporate gatherings unforgettable.",
      icon: "💼",
      color: "green",
    },
  ];

  return (
    <section className="home-services">
      <div className="max-w-7xl mx-auto px-5">
        <div className="home-section-heading">
          <span className="home-section-eyebrow">
            MADE FOR YOUR MOMENT
          </span>
          <h2>
            A little more <span>extraordinary.</span>
          </h2>
          <p>
            From a live performance to a personal appearance, find the right
            kind of guest for the story you want to tell.
          </p>
        </div>

        <div className="home-service-grid">
          {services.map((service) => (
            <div
              key={service.title}
              className="home-service-card"
            >
              <div className={`home-service-icon ${service.color}`}>
                {service.icon}
              </div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <Link to="/services" aria-label={`Learn about ${service.title}`}>
                Learn more <span aria-hidden="true">↗</span>
              </Link>
            </div>
          ))}
        </div>
        <div className="home-services-action">
          <Link to="/services">Explore all services <span aria-hidden="true">→</span></Link>
        </div>
      </div>
    </section>
  );
}

export default Services;
