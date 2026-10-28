import { Link } from "react-router";
import "./about.css";

const principles = [
  {
    number: "01",
    title: "A request starts the conversation",
    description:
      "Tell us about your event and the person you hope to invite. Submitting the form is a request—not a confirmed booking.",
  },
  {
    number: "02",
    title: "Details shape the quote",
    description:
      "Event type, date, location, and appearance format all matter. Starting prices are estimates, and the final fee must be confirmed.",
  },
  {
    number: "03",
    title: "You decide before committing",
    description:
      "Review availability, terms, and the final quote with the booking team before agreeing to any arrangements or payment.",
  },
];

const eventTypes = [
  { icon: "✦", title: "Live performances", text: "Bring music and entertainment to a celebration or public event." },
  { icon: "◉", title: "Meet and greets", text: "Create a chance for guests and fans to connect with a familiar face." },
  { icon: "↗", title: "Speaking and hosting", text: "Invite a guest speaker, panelist, presenter, or event host." },
  { icon: "⌂", title: "Brand and corporate events", text: "Explore appearances for launches, conferences, and company events." },
  { icon: "♡", title: "Charity and community", text: "Plan an appearance for a fundraiser, gala, or local gathering." },
  { icon: "◎", title: "Virtual appearances", text: "Ask about remote greetings, interviews, and online events." },
];

function AboutPage() {
  return (
    <main className="about-page overflow-hidden bg-[#f7f6f2] text-[#202331]">
      <section className="about-hero relative overflow-hidden bg-[#17182a] px-5 pb-20 pt-32 text-white md:pb-28 md:pt-40">
        <div className="about-hero-glow" aria-hidden="true" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.1fr_.9fr]">
          <div className="max-w-2xl">
            <p className="about-eyebrow"><span /> A little about us</p>
            <h1 className="mt-6 text-5xl font-semibold leading-[1.04] tracking-[-.055em] sm:text-6xl lg:text-7xl">
              Make room for a
              <span className="about-gradient block">remarkable moment.</span>
            </h1>
            <p className="mt-6 max-w-xl text-base leading-7 text-white/65 sm:text-lg sm:leading-8">
              MyStarBooking helps you discover talent and request a celebrity
              appearance for the events people remember.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/celebrities" className="about-primary-button">
                Explore celebrities <span aria-hidden="true">↗</span>
              </Link>
              <Link to="/services" className="about-secondary-button">
                Explore services
              </Link>
            </div>
          </div>

          <div className="about-feature-art" aria-label="Plan your next memorable event">
            <div className="about-orbit about-orbit-one" />
            <div className="about-orbit about-orbit-two" />
            <div className="about-feature-card">
              <span className="about-feature-label">YOUR EVENT, YOUR MOMENT</span>
              <div className="about-star-mark">✳</div>
              <p>Something<br /><em>to remember.</em></p>
              <span className="about-card-line" />
              <span className="about-card-caption">Start with an idea. We’ll help with the next step.</span>
            </div>
            <span className="about-floating-note about-note-top">A guest your crowd loves</span>
            <span className="about-floating-note about-note-bottom">The moment is yours <span>✦</span></span>
          </div>
        </div>
        <div className="about-hero-bottom" aria-hidden="true"><span>DISCOVER</span><i /></div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 md:py-28">
        <div className="grid gap-10 md:grid-cols-[.8fr_1.2fr] md:gap-20">
          <div>
            <p className="about-section-eyebrow">THE IDEA</p>
            <h2 className="mt-4 max-w-md text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
              Big occasions deserve a thoughtful guest list.
            </h2>
          </div>
          <div className="space-y-5 text-sm leading-7 text-[#666879] sm:text-base sm:leading-8">
            <p>
              Sometimes one appearance can give an event its own story. We built
              MyStarBooking as a place to explore celebrity profiles, consider
              different kinds of appearances, and send a request for the talent
              you have in mind.
            </p>
            <p>
              Browse public profiles, share your event details, and start a
              conversation about what may be possible. We aim to make the first
              steps clear, without treating an enquiry as a promise of
              availability or a confirmed booking.
            </p>
            <Link to="/celebrities" className="about-inline-link">
              Find a guest for your event <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>

      <section className="border-y border-[#e9e7e2] bg-white/70 px-5 py-20 sm:px-8 md:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-xl">
            <p className="about-section-eyebrow">WHAT WE CAN HELP YOU EXPLORE</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
              Different events. One special guest.
            </h2>
            <p className="mt-4 text-sm leading-7 text-[#777989] sm:text-base">
              The right format depends on your event, your audience, and the
              guest’s availability. Here are a few ways to get started.
            </p>
          </div>
          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {eventTypes.map((item) => (
              <article key={item.title} className="about-event-card">
                <span className="about-event-icon" aria-hidden="true">{item.icon}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link to="/services" className="about-inline-link">
              See all services <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 md:py-28">
        <div className="grid gap-10 lg:grid-cols-[.72fr_1.28fr] lg:gap-20">
          <div>
            <p className="about-section-eyebrow">HOW IT WORKS</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
              Clear steps, from the first hello.
            </h2>
            <p className="mt-4 max-w-sm text-sm leading-7 text-[#777989] sm:text-base">
              Every enquiry is a starting point. Here’s what to expect as you
              explore a booking.
            </p>
          </div>
          <div className="about-principles">
            {principles.map((principle) => (
              <article key={principle.number} className="about-principle">
                <span>{principle.number}</span>
                <div>
                  <h3>{principle.title}</h3>
                  <p>{principle.description}</p>
                </div>
                <span className="about-principle-arrow" aria-hidden="true">↗</span>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 pb-20 sm:px-8 md:pb-28">
        <div className="about-cta relative mx-auto max-w-7xl overflow-hidden rounded-3xl px-6 py-12 text-white sm:px-12 md:py-16">
          <div className="about-cta-glow" aria-hidden="true" />
          <div className="relative flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
            <div className="max-w-2xl">
              <p className="about-eyebrow"><span /> YOUR NEXT CHAPTER</p>
              <h2 className="mt-5 text-3xl font-semibold leading-tight tracking-tight sm:text-4xl md:text-5xl">
                Have a date, a dream, or just an idea?
              </h2>
              <p className="mt-4 max-w-xl text-sm leading-7 text-white/65 sm:text-base">
                Tell us a little about it. We’ll use your request to start a
                conversation about the details.
              </p>
            </div>
            <Link to="/booking" className="about-primary-button shrink-0">
              Start a booking request <span aria-hidden="true">↗</span>
            </Link>
          </div>
          <p className="relative mt-8 border-t border-white/15 pt-5 text-xs leading-5 text-white/45">
            Requests are not confirmed bookings. Availability, final pricing,
            and arrangements must be confirmed before you commit or pay.
          </p>
        </div>
      </section>
    </main>
  );
}

export default AboutPage;
