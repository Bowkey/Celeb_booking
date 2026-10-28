import { Link } from "react-router";
import Services from "./Services.jsx";

const bookingOptions = [
  {
    icon: "🎤",
    title: "Live performances",
    description: "Book a musical act or entertainer for concerts, festivals, private celebrations, and company events.",
    examples: "Concerts · Festivals · Private parties",
  },
  {
    icon: "🤝",
    title: "Meet and greets",
    description: "Give guests a memorable chance to meet a favorite star, take photos, and share a personal moment.",
    examples: "Fan events · Photo sessions · Signings",
  },
  {
    icon: "🎙️",
    title: "Speaking and hosting",
    description: "Bring a recognizable voice to your stage as a keynote speaker, panel guest, presenter, or host.",
    examples: "Keynotes · Panels · Award ceremonies",
  },
  {
    icon: "🏢",
    title: "Corporate appearances",
    description: "Make a product launch, company celebration, or brand activation stand out with a special guest.",
    examples: "Launches · Brand events · Conferences",
  },
  {
    icon: "💛",
    title: "Charity and community",
    description: "Invite talent to support a fundraiser, awareness campaign, community gathering, or charitable gala.",
    examples: "Fundraisers · Galas · Community events",
  },
  {
    icon: "📹",
    title: "Virtual appearances",
    description: "Arrange a remote greeting, interview, Q&A, or livestream appearance for audiences anywhere.",
    examples: "Virtual Q&As · Greetings · Livestreams",
  },
];

const bookingSteps = [
  { number: "01", title: "Tell us what you’re planning", description: "Choose an event type, preferred date, and the celebrity you have in mind." },
  { number: "02", title: "We check availability", description: "Our team reviews the details and follows up to discuss availability and a final quote." },
  { number: "03", title: "Confirm your booking", description: "Once the details and terms are agreed, we’ll guide you through the next steps." },
];

function ServicesPage() {
  return (
    <main className="services-page bg-[#f7f6f2] pb-20 pt-24 text-[#242435]">
      <section className="mx-auto max-w-7xl px-5 pb-16 pt-12 text-center md:pb-20 md:pt-16">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#8069db]">
          Make your event unforgettable
        </p>
        <h1 className="mx-auto mt-4 max-w-4xl text-4xl font-bold leading-tight tracking-tight text-[#292a38] md:text-6xl">
          The right guest can make <span className="text-[#7356d8]">the moment.</span>
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-[#777989] md:text-lg">
          From live performances to intimate meet and greets, we help you explore
          celebrity appearances for events of every kind.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link to="/booking" className="rounded-xl bg-[#7356d8] px-7 py-3 text-sm font-bold text-white transition hover:bg-[#6045c0]">
            Start a booking request
          </Link>
          <Link to="/celebrities" className="rounded-xl border border-[#dedbe6] bg-white px-7 py-3 text-sm font-semibold text-[#494461] transition hover:border-[#b8a9eb] hover:text-[#7356d8]">
            Explore celebrities
          </Link>
        </div>
      </section>

      <Services />

      <section className="mx-auto max-w-7xl px-5 py-16 md:py-20">
        <div className="mb-10 max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#8069db]">Ways to work with us</p>
          <h2 className="mt-3 text-3xl font-bold text-[#292a38] md:text-4xl">Find the right kind of appearance</h2>
          <p className="mt-4 leading-7 text-[#777989]">
            Every event is different. Share your goals and we’ll help you understand
            the options for the talent and format you have in mind.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {bookingOptions.map((option) => (
            <article key={option.title} className="rounded-2xl border border-[#e9e7e2] bg-white p-6 transition hover:-translate-y-1 hover:border-[#d2c8f4] hover:shadow-lg">
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-[#f0edfc] text-2xl" aria-hidden="true">{option.icon}</span>
              <h3 className="mt-5 text-lg font-bold text-[#333444]">{option.title}</h3>
              <p className="mt-2 min-h-20 text-sm leading-6 text-[#777989]">{option.description}</p>
              <p className="mt-4 border-t border-[#eeecf0] pt-4 text-xs font-medium text-[#7356d8]">{option.examples}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-[#e9e7e2] bg-white/70">
        <div className="mx-auto max-w-7xl px-5 py-16 md:py-20">
          <div className="mb-10 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#8069db]">A clear process</p>
            <h2 className="mt-3 text-3xl font-bold text-[#292a38] md:text-4xl">From first idea to event day</h2>
          </div>
          <div className="grid gap-8 md:grid-cols-3 md:gap-6">
            {bookingSteps.map((step) => (
              <article key={step.number} className="relative border-l border-[#cfc5f0] pl-5 md:border-l-0 md:border-t md:pl-0 md:pt-5">
                <span className="text-xs font-bold tracking-widest text-[#7356d8]">{step.number}</span>
                <h3 className="mt-3 text-lg font-bold text-[#333444]">{step.title}</h3>
                <p className="mt-2 max-w-sm text-sm leading-6 text-[#777989]">{step.description}</p>
              </article>
            ))}
          </div>
          <p className="mx-auto mt-10 max-w-2xl text-center text-xs leading-5 text-[#9293a0]">
            Submitting a request does not confirm talent availability or a final
            fee. Booking details and pricing are confirmed with you before any
            commitment or payment.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-5 py-16 text-center md:py-20">
        <h2 className="text-3xl font-bold text-[#292a38] md:text-4xl">Have an event in mind?</h2>
        <p className="mx-auto mt-4 max-w-xl leading-7 text-[#777989]">
          Tell us what you’re planning and who you’d like to invite. We’ll help
          you take the next step.
        </p>
        <Link to="/booking" className="mt-7 inline-flex rounded-xl bg-[#7356d8] px-7 py-3 font-bold text-white transition hover:bg-[#6045c0]">
          Request a booking
        </Link>
      </section>
    </main>
  );
}

export default ServicesPage;
