import { useState } from "react";
import { useNavigate } from "react-router";

const eventTypes = [
  "Meet and Greet",
  "Fan Signing Event",
  "Q&A Sessions",
  "VIP Backstage Access",
  "Press Conference",
  "Charity Events or Galas",
  "Private Dinner or Brunches",
  "Workshops or Masterclasses",
  "Fan Contests or Sweepstakes",
  "Red Carpet Events",
  "Virtual Meetups",
  "Exclusive Screening or Listening Parties",
  "Photo Opportunities",
  "Public Appearances",
  "Fan Club Gatherings",
];

const inputClassName =
  "mt-2 w-full rounded-xl border border-white/15 bg-black/40 px-4 py-3 text-white placeholder:text-gray-500 focus:border-blue-400 focus:outline-none";

function BookPage() {
  const navigate = useNavigate();
  const [celebrityName] = useState(
    () => new URLSearchParams(window.location.search).get("celebrity") || "",
  );

  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const params = new URLSearchParams({
      celebrity: String(formData.get("celebrityName") || ""),
      eventType: String(formData.get("eventType") || ""),
    });
    navigate(`/payment?${params.toString()}`);
  }

  return (
    <main className="min-h-[70vh] bg-black px-5 pb-20 pt-32 text-white">
      <div className="mx-auto max-w-3xl">
        <div className="mb-10 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">
            Make it unforgettable
          </p>
          <h1 className="mt-3 text-4xl font-bold md:text-5xl">
            Book a Celebrity
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-gray-400">
            Tell us about your event and who you would like to book.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-6 rounded-2xl border border-white/10 bg-white/5 p-6 md:p-10"
        >
          <div>
            <label htmlFor="celebrity-name" className="font-medium">
              Celebrity Name
            </label>
            <input
              id="celebrity-name"
              name="celebrityName"
              type="text"
              value={celebrityName}
              placeholder="Enter the celebrity's name"
              readOnly={Boolean(celebrityName)}
              required
              className={`${inputClassName} ${
                celebrityName ? "cursor-not-allowed text-gray-300" : ""
              }`}
            />
          </div>

          <div>
            <label htmlFor="event-type" className="font-medium">
              Event Type
            </label>
            <select
              id="event-type"
              name="eventType"
              defaultValue=""
              required
              className={`${inputClassName} [&>option]:bg-gray-950`}
            >
              <option value="" disabled>
                Select an event type
              </option>
              {eventTypes.map((eventType) => (
                <option key={eventType} value={eventType}>
                  {eventType}
                </option>
              ))}
            </select>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <label htmlFor="full-name" className="font-medium">
                Full Name
              </label>
              <input
                id="full-name"
                name="fullName"
                type="text"
                autoComplete="name"
                required
                className={inputClassName}
              />
            </div>
            <div>
              <label htmlFor="contact-number" className="font-medium">
                Contact Number
              </label>
              <input
                id="contact-number"
                name="contactNumber"
                type="tel"
                autoComplete="tel"
                required
                className={inputClassName}
              />
            </div>
            <div>
              <label htmlFor="country" className="font-medium">
                Country
              </label>
              <input
                id="country"
                name="country"
                type="text"
                autoComplete="country-name"
                required
                className={inputClassName}
              />
            </div>
            <div>
              <label htmlFor="state" className="font-medium">
                State
              </label>
              <input
                id="state"
                name="state"
                type="text"
                autoComplete="address-level1"
                required
                className={inputClassName}
              />
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="email" className="font-medium">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className={inputClassName}
              />
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="address" className="font-medium">
                Home/Business Address
              </label>
              <textarea
                id="address"
                name="address"
                autoComplete="street-address"
                rows="3"
                required
                className={`${inputClassName} resize-y`}
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full rounded-xl bg-blue-400 px-6 py-3.5 font-bold text-black transition-colors hover:bg-blue-300"
          >
            Submit Booking
          </button>

        </form>
      </div>
    </main>
  );
}

export default BookPage;
