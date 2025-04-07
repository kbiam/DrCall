import { useState, useEffect } from 'react'
import './App.css'
import Lenis from 'lenis'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import SignUpPage from './pages/SignUpPage'
import GettingStarted from './pages/GettingStarted'
import ConnectedCalendar from './pages/ConnectedCalendar'
import VideoApp from './pages/VideoApp'
import SetupAvailability from './pages/SetupAvailability'
import { LogIn } from 'lucide-react'
import Login from './pages/Login'
import DoctorDashboard from './pages/DoctorDashboard'
import PatientScheduling from './pages/PatientScheduling'  // Import the new component
import PatientRegister from './pages/PatientRegister'

function AppRoutes() {
  const location = useLocation()
  useEffect(() => {
    const lenis = new Lenis({
      autoRaf: true,
    })

    return () => {
      lenis.destroy()
    }
  }, [])
  
  return (
    <Routes location={location} key={location.pathname}>
      <Route path='/' element={<LandingPage/>} />
      <Route path='/signup' element={<SignUpPage/>} />
      {/* <Route path='/patientsignup' element={<PatientRegister/>} /> */}
      <Route path='/doctordashboard' element={<DoctorDashboard/>} />
      <Route path='/login' element={<Login/>} />
      <Route path='/getting-started' element={<GettingStarted />} />
      {/* <Route path='/getting-started/connected-calendar' element={<ConnectedCalendar />} />
      <Route path='/getting-started/connected-video' element={<VideoApp />} />
      <Route path='/getting-started/setup-availability' element={<SetupAvailability />} /> */}
      <Route path='/meet/:doctorId/:uniqueId' element={<PatientScheduling />} />  {/* Add this new route */}
    </Routes>
  )
}

function App(){
  return(
    <Router>
      <AppRoutes/>
    </Router>
  )
}

export default App