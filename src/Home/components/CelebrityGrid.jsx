import FetchStar from "../FetchStar.jsx";

function CelebrityGrid() {
  return (
    <section className="bg-black py-20" id="celebrities">
      <div className="mx-auto max-w-7xl px-5">
        <div className="mb-10 text-center h-full">
          <span className="text-sm font-medium uppercase tracking-widest text-blue-400">
            Discover talent
          </span>
          <h2 className="mt-3 text-4xl font-bold text-white md:text-5xl">
            Find your <span className="text-blue-400">star</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-gray-400">
            Search to book an appointment
          </p>
        </div>
        <FetchStar />
      </div>
    </section>
  );
}

export default CelebrityGrid;
