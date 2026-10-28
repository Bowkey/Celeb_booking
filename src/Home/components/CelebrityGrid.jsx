import FetchStar from "../FetchStar.jsx";

function CelebrityGrid() {
  return (
    <section className="home-celebrity-section" id="celebrities">
      <div className="mx-auto max-w-7xl px-5">
        <div className="home-section-heading">
          <span className="home-section-eyebrow">
            DISCOVER TALENT
          </span>
          <h2>
            Find your <span>star.</span>
          </h2>
          <p>
            Browse the people who can make your next event extraordinary.
          </p>
        </div>
        <FetchStar />
      </div>
    </section>
  );
}

export default CelebrityGrid;
