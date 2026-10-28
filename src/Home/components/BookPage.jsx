import { useState } from "react";
import { useNavigate } from "react-router";
import { getCelebrityRate, saveBooking } from "../../Admin/adminData.js";

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

const inputClassName = "booking-field-control";

function BookPage() {
  const navigate = useNavigate();
  const [saveError, setSaveError] = useState("");
  const [celebrityName] = useState(
    () => new URLSearchParams(window.location.search).get("celebrity") || "",
  );
  const celebrityRate = getCelebrityRate(celebrityName);

  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const bookingId = `BK-${Date.now().toString().slice(-6)}`;
    const booking = {
      id: bookingId,
      customer: String(formData.get("fullName") || "").trim(),
      email: String(formData.get("email") || "").trim(),
      celebrity: String(formData.get("celebrityName") || "").trim(),
      event: String(formData.get("eventType") || "").trim(),
      date: String(formData.get("eventDate") || new Date().toISOString().slice(0, 10)),
      amount: getCelebrityRate(String(formData.get("celebrityName") || "").trim()) || 0,
      status: "Pending",
      contactNumber: String(formData.get("contactNumber") || "").trim(),
      country: String(formData.get("country") || "").trim(),
      state: String(formData.get("state") || "").trim(),
      address: String(formData.get("address") || "").trim(),
    };
    try {
      saveBooking(booking);
    } catch (error) {
      console.error("Could not save booking request.", error);
      setSaveError("We couldn't save your booking request. Please check your browser storage and try again.");
      return;
    }
    const params = new URLSearchParams({
      celebrity: booking.celebrity,
      eventType: booking.event,
      bookingId,
    });
    navigate(`/payment?${params.toString()}`);
  }

  return (
    <main className="booking-page">
      <div className="booking-layout">
        <aside className="booking-intro">
          <span className="booking-eyebrow">MAKE IT A MOMENT</span>
          <h1>Start your booking request.</h1>
          <p>
            Tell us about your event and who you would like to invite. Our team
            will follow up to discuss availability and a final quote.
          </p>
          <div className="booking-confidence">
            <span>No commitment to enquire</span>
            <span>Final pricing confirmed with you</span>
            <span>Availability checked for your date</span>
          </div>
        </aside>

        <form onSubmit={handleSubmit} className="booking-form">
          <div className="booking-form-heading">
            <h2>Tell us about your event</h2>
            <p>Fields marked below are required.</p>
          </div>
          <div>
            <label htmlFor="celebrity-name" className="font-medium">
              Celebrity Name
            </label>
            <input
              id="celebrity-name"
              name="celebrityName"
              type="text"
              value={celebrityName}
              placeholder="Go to the Celebrity search bar and select availabile Star"
              readOnly={Boolean(celebrityName)}
              required
              className={`${inputClassName} ${
                celebrityName ? "cursor-not-allowed text-gray-300" : ""
              }`}
            />
            {celebrityName && (
              <p className="booking-estimate">
                {celebrityRate === null
                  ? "No public starting price is set yet. We'll confirm the quote after you submit your request."
                  : `Estimated starting price: $${celebrityRate.toLocaleString("en-US")}. The final quote is confirmed by the booking team before you commit.`}
              </p>
            )}
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
              className={inputClassName}
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

          <div>
            <label htmlFor="event-date" className="font-medium">
              Preferred Event Date
            </label>
            <input
              id="event-date"
              name="eventDate"
              type="date"
              min={new Date().toISOString().slice(0, 10)}
              required
              className={inputClassName}
            />
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

          {saveError && <p role="alert" className="booking-error">{saveError}</p>}

          <button
            type="submit"
            className="booking-submit"
          >
            Send booking request <span aria-hidden="true">→</span>
          </button>
          <p className="booking-note">Sending a request does not confirm a booking or require payment.</p>
        </form>
      </div>
    </main>
  );
}

export default BookPage;
