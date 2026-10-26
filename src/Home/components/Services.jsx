function Services() {
  const services = [
    {
      title: "Live Performances",
      description:
        "Watch your event come alive with live singing, dancing, and performances by the best talent.",
      icon: "🎤",
      color: "from-blue-400 to-orange-400",
    },
    {
      title: "Destination Events",
      description:
        "Celebrity packages for destination weddings, award shows, and exclusive corporate events.",
      icon: "✈️",
      color: "from-blue-400 to-indigo-400",
    },
    {
      title: "Social Media Stars",
      description:
        "Influence your audience with popular creators who dominate the social media scene.",
      icon: "📱",
      color: "from-purple-400 to-pink-400",
    },
    {
      title: "Corporate Events",
      description:
        "Speakers, entertainers, and emcees that make your corporate gatherings unforgettable.",
      icon: "💼",
      color: "from-emerald-400 to-teal-400",
    },
  ];

  return (
    <section className="py-20 bg-gray-950/50">
      <div className="max-w-7xl mx-auto px-5">
        <div className="text-center mb-14">
          <span className="text-blue-400 text-sm font-medium uppercase tracking-widest">
            Why Choose Us
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-3 mb-4">
            Your Party, <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">Elevated</span>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto mb-8 text-lg">
            We handle the logistics so you can focus on making memories. Here's
            how we make booking effortless.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {services.map((service, idx) => (
            <div
              key={idx}
              className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:border-white/20 transition-all group"
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center text-2xl mb-4 shadow-lg`}>
                {service.icon}
              </div>
              <h3 className="text-white font-bold text-lg mb-2">{service.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Services;
