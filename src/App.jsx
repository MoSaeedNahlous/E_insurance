import './App.css'
import './bootstrap.css'
import {BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import DoctorReg from './pages/registerPages/DoctorReg'
import { AuthContextProvider } from './contexts/Auth/AuthContext'
import DoctorLogin from './pages/loginPages/DoctorLogin'
import Home from './pages/genericPages/Home'
import PatientReg from './pages/registerPages/PatientReg'
import PatientLogin from './pages/loginPages/PatientLogin'
import PharmacistReg from './pages/registerPages/PharmacistReg'
import DoctorsAdmin from './pages/adminPages/DoctorsAdmin'
import { DoctorsContextProvider } from './contexts/doctors/DoctorsContext'
import PharmacistsAdmin from './pages/adminPages/PharmacistsAdmin'
import { PharmacistsContextProvider } from './contexts/pharmacists/PharmacistsContext'
import PatientsAdmin from './pages/adminPages/PatientsAdmin'
import { PatientsContextProvider } from './contexts/patients/PatientsContext'
import DoctorPanel from './pages/doctorPages/DoctorPanel'
import PharmacistPanel from './pages/pharamacistPages/PharmacistPanel'
import { pharmacistLogin } from './contexts/Auth/AuthActions'
import PharmacistLogin from './pages/loginPages/PharmacistLogin'
import PatientPanel from './pages/patientPages/PatientPanel'

function App() {
  return (
    <PatientsContextProvider>
    <PharmacistsContextProvider>
    <DoctorsContextProvider>
    <AuthContextProvider>
      <Router>
        <Navbar />
        <div className="App">
          <Routes>
            
            
            <Route exact path='/doctor/login' element={ <DoctorLogin /> } />
            
            <Route exact path='/patient/register' element={ <PatientReg /> } />
            <Route exact path='/patient/login' element={ <PatientLogin /> } />

            
            <Route exact path='/pharmacist/login' element={ <PharmacistLogin /> } />


            {/* Admin */ }
            <Route exact path='/admin/pharmacists/register' element={ <PharmacistReg /> } />
            <Route exact path='/admin/doctors/register' element={ <DoctorReg /> } />
            <Route exact path='/admin/doctors' element={ <DoctorsAdmin /> } />
            <Route exact path='/admin/pharmacists' element={ <PharmacistsAdmin /> } />
            <Route exact path='/admin/patients' element={ <PatientsAdmin /> } />
                  
            {/* Doctor */ }
            <Route exact path='/doctor' element={ <DoctorPanel /> } />
                  
            {/* Pharmacist */ }
                  <Route exact path='/pharmacist' element={ <PharmacistPanel /> } />
                  
                  {/* Patient */ }
            <Route exact path='/patient' element={ <PatientPanel /> } />
              
          
            <Route exact path='/' element={ <Home /> } />
              
          </Routes>
        </div>
      </Router>
      </AuthContextProvider>
      </DoctorsContextProvider>
      </PharmacistsContextProvider>
    </PatientsContextProvider>
  )
}

export default App
