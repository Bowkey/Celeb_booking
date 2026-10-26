import CelebrityGrid from "./components/CelebrityGrid";
import Services from "./components/Services";
import Testimonials from "./components/Testimonials";
import Footer from "./components/Footer";
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
      <Footer />
    </>
  );
}

export default HomePage;