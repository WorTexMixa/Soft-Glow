import { Routes, Route } from 'react-router'

import Header from './components/Header'
import Footer from './components/Footer'

import HomePage from './pages/HomePage'
import ServicesPage from './pages/ServicesPage'
import MastersPage from './pages/MastersPage'
import BookingPage from './pages/BookingPage'
import ContactsPage from './pages/ContactsPage'


function App() {

  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/services" element={<ServicesPage/>} />
        <Route path="/masters" element={<MastersPage/>} />
        <Route path="/booking" element={<BookingPage />} />
        <Route path="/contacts" element={<ContactsPage />} />
      </Routes>
  
      <Footer />
    </>
  )
}

export default App
