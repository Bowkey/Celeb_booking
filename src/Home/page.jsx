import CelebrityGrid from "./components/CelebrityGrid";
import Services from "./components/Services";
import Testimonials from "./components/Testimonials";
import Hero from "./components/Hero";
function HomePage() {
  return (
    <>
      <main>
        <Hero />
        <CelebrityGrid />
        <Services />
        <Testimonials />
      </main>
    </>
  );
}

export default HomePage;