import { Route, Routes } from "react-router";
import FetchStar from "./Home/FetchStar.jsx";
import HomePage from "./Home/page.jsx";
import NavBar from "./Home/components/NavBar.jsx";
import Footer from "./Home/components/Footer.jsx";
import BookPage from "./Home/components/BookPage.jsx";
import PaymentPage from "./Home/components/PaymentPage.jsx";
function App() {
  return (
    <div className="px-5 bg-black">
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/celebrities" element={<FetchStar />} />
        <Route path="/fetchster" element={<FetchStar />} />
        <Route path="/booking" element={<BookPage />} />
        <Route path="/payment" element={<PaymentPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
