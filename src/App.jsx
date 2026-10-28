import { Outlet, Route, Routes } from "react-router";
import FetchStar from "./Home/FetchStar.jsx";
import HomePage from "./Home/page.jsx";
import NavBar from "./Home/components/NavBar.jsx";
import Footer from "./Home/components/Footer.jsx";
import BookPage from "./Home/components/BookPage.jsx";
import PaymentPage from "./Home/components/PaymentPage.jsx";
import ServicesPage from "./Home/components/ServicesPage.jsx";
import AboutPage from "./Home/components/AboutPage.jsx";
import AdminDashboard from "./Admin/AdminDashboard.jsx";
function App() {
  return (
    <Routes>
      <Route path="/admin/*" element={<AdminDashboard />} />
      <Route element={<SiteLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/celebrities" element={<FetchStar />} />
        <Route path="/fetchster" element={<FetchStar />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/booking" element={<BookPage />} />
        <Route path="/payment" element={<PaymentPage />} />
      </Route>
    </Routes>
  );
}

function SiteLayout() {
  return (
    <div className="app-site">
      <NavBar />
      <Outlet />
      <Footer />
    </div>
  );
}

export default App;
