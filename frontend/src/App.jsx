import { Routes, Route } from "react-router";

import Header from "./components/Header";
import Footer from "./components/Footer";

import HomePage from "./pages/HomePage";
import ServicesPage from "./pages/ServicesPage";
import MastersPage from "./pages/MastersPage";
import BookingPage from "./pages/BookingPage";
import ContactsPage from "./pages/ContactsPage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import MyAppointmentsPage from "./pages/MyAppointmentsPage";
import AdminPage from "./pages/AdminPage";

function App() {
  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/masters" element={<MastersPage />} />
        <Route path="/booking" element={<BookingPage />} />
        <Route path="/contacts" element={<ContactsPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/my-appointments" element={<MyAppointmentsPage />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
