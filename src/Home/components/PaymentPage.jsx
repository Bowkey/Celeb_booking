import { useState } from "react";

const BITCOIN_ADDRESS = "REPLACE_WITH_YOUR_BITCOIN_ADDRESS";
const STRIPE_CHECKOUT_ENDPOINT = import.meta.env.VITE_STRIPE_CHECKOUT_ENDPOINT;

function PaymentPage() {
  const [method, setMethod] = useState("card");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const params = new URLSearchParams(window.location.search);
  const celebrityName = params.get("celebrity") || "";
  const eventType = params.get("eventType") || "";
  const hasBitcoinAddress =
    BITCOIN_ADDRESS !== "REPLACE_WITH_YOUR_BITCOIN_ADDRESS";

  async function startCardCheckout() {
    if (!STRIPE_CHECKOUT_ENDPOINT) {
      setError(
        "Card checkout is not configured yet. Set VITE_STRIPE_CHECKOUT_ENDPOINT to your server-side Stripe Checkout endpoint.",
      );
      return;
    }

    setLoading(true);
    setError("");
    try {
      const response = await fetch(STRIPE_CHECKOUT_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ celebrityName, eventType }),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Could not start Stripe Checkout.");
      }
      if (
        typeof data.url !== "string" ||
        !data.url.startsWith("https://checkout.stripe.com/")
      ) {
        throw new Error("The checkout server returned an invalid Stripe URL.");
      }

      window.location.assign(data.url);
    } catch (checkoutError) {
      setError(
        checkoutError instanceof Error
          ? checkoutError.message
          : "Could not start Stripe Checkout.",
      );
    } finally {
      setLoading(false);
    }
  }

  async function copyBitcoinAddress() {
    try {
      await navigator.clipboard.writeText(BITCOIN_ADDRESS);
      setCopied(true);
    } catch {
      setError("Could not copy the Bitcoin address. Please copy it manually.");
    }
  }

  return (
    <main className="payment-page">
      <section className="payment-card">
        <div className="text-center">
          <p className="payment-eyebrow">
            NEXT STEP
          </p>
          <h1 className="mt-3">Review your payment options</h1>
          {(celebrityName || eventType) && (
            <p className="mt-4 text-sm">
              {celebrityName && <span>{celebrityName}</span>}
              {celebrityName && eventType && <span> · </span>}
              {eventType && <span>{eventType}</span>}
            </p>
          )}
        </div>

        <div
          className="payment-tabs mt-8 grid grid-cols-2 gap-3"
          role="tablist"
          aria-label="Payment method"
        >
          <button
            id="card-tab"
            type="button"
            role="tab"
            aria-selected={method === "card"}
            aria-controls="card-panel"
            onClick={() => {
              setMethod("card");
              setError("");
            }}
            className={`payment-tab ${method === "card" ? "selected" : ""}`}
          >
            Pay with Card
          </button>
          <button
            id="bitcoin-tab"
            type="button"
            role="tab"
            aria-selected={method === "bitcoin"}
            aria-controls="bitcoin-panel"
            onClick={() => {
              setMethod("bitcoin");
              setError("");
            }}
            className={`payment-tab ${method === "bitcoin" ? "selected" : ""}`}
          >
            Pay with Bitcoin
          </button>
        </div>

        {method === "card" ? (
          <div
            id="card-panel"
            role="tabpanel"
            aria-labelledby="card-tab"
            className="mt-8 text-center"
          >
            <h2 className="text-xl font-semibold">Card payment via Stripe</h2>
            <p className="mt-2 text-sm leading-relaxed">
              You’ll be redirected to Stripe’s secure checkout. Card details
              are entered on Stripe, not stored by this site.
            </p>
            <button
              type="button"
              onClick={startCardCheckout}
              disabled={loading}
              className="payment-action mt-6 w-full px-6 py-3.5 font-bold disabled:cursor-wait disabled:opacity-60"
            >
              {loading ? "Connecting to Stripe..." : "Continue to Card Checkout"}
            </button>
          </div>
        ) : (
          <div
            id="bitcoin-panel"
            role="tabpanel"
            aria-labelledby="bitcoin-tab"
            className="mt-8"
          >
            <h2 className="text-center text-xl font-semibold">
              Pay with Bitcoin
            </h2>
            <p className="mt-2 text-center text-sm">
              Send Bitcoin only after confirming the address with the recipient.
              This page cannot verify blockchain payments.
            </p>
            <div className="payment-address mt-5 rounded-xl p-4">
              <p className="text-xs font-semibold uppercase tracking-wider">
                Bitcoin address
              </p>
              <p className="mt-2 break-all font-mono text-sm">
                {BITCOIN_ADDRESS}
              </p>
            </div>
            {hasBitcoinAddress ? (
              <button
                type="button"
                onClick={copyBitcoinAddress}
                className="payment-copy mt-4 w-full px-6 py-3 font-semibold"
              >
                {copied ? "Address copied" : "Copy Bitcoin Address"}
              </button>
            ) : (
              <p className="mt-4 text-center text-sm text-amber-700">
                Replace the placeholder address in PaymentPage.jsx with a
                Bitcoin address you control before accepting payments.
              </p>
            )}
          </div>
        )}

        {error && (
          <p role="alert" className="payment-error mt-5 text-center">
            {error}
          </p>
        )}
      </section>
    </main>
  );
}

export default PaymentPage;
