import React,{useState} from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { ExperienceProvider } from "./pages/ExperienceContext"
import Header from "./components/Header"
import Home from "./pages/Home"
import Details from "./pages/Details"
import Checkout from "./pages/Checkout"
import Confirmation from "./pages/Confirmation"

function App() {
  const [selectedExperience, setSelectedExperience] = useState(null)
  const [bookingData, setBookingData] = useState(null)

  return (
    <Router>
      <ExperienceProvider>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
<Route path="/details/:id" element={<Details setBookingData={setBookingData} />} />
          <Route path="/checkout" element={<Checkout bookingData={bookingData} setBookingData={setBookingData} />} />
        <Route path="/confirmation" element={<Confirmation bookingData={bookingData} />} />
        </Routes>
      </ExperienceProvider>
    </Router>
  )
}

export default App
