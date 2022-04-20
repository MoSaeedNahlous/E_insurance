import React, { useContext } from 'react'
import { Link} from 'react-router-dom'
import { logout } from '../contexts/Auth/AuthActions'
import { AuthContext } from '../contexts/Auth/AuthContext'

const Navbar = () => {
  const { dispatch, user } = useContext(AuthContext)
  const logoutHandler = () => {
    logout(dispatch)
  }
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
  <div className="container-fluid">
    <h3 className="navbar-brand" >E-HealthInsurance</h3>
        <button className="navbar-toggler" type="button"
          data-bs-toggle="collapse" data-bs-target="#navbarColor01"
          aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>

    <div className="collapse navbar-collapse" id="navbarColor01">
      <ul className="navbar-nav me-auto">
        {/* <li className="nav-item">
          <a className="nav-link active" href="#">Home
            <span className="visually-hidden">(current)</span>
          </a>
            </li>  */}
            { !user?._id &&
              <li className="nav-item">
                <Link className="nav-link" to='/patient/register'>Register</Link>
              </li>
            }
            { !user?._id &&
              <li className="nav-item">
                <Link className="nav-link" to='/patient/login'>Login</Link>
              </li>
            }
            { !user?._id &&
              <li className="nav-item">
                <Link className="nav-link" to='/doctor/login'>Login as Doctor</Link>
              </li>
            }
            { !user?._id &&
              <li className="nav-item">
                <Link className="nav-link" to='/pharmacist/login'>Login as Pharmacist</Link>
              </li>
            }
        {user?.role == 'doctor' &&
        <li className="nav-item">
          <Link className="nav-link" to='/doctor'>Doctor Panel</Link>
              </li>
            }
            { user?.role == 'patient' &&
              <li className="nav-item">
                <Link className="nav-link" to={'/patient'}>Patient Panel</Link>
              </li>
            }
            { user?.role == 'pharmacist' &&
              <li className="nav-item">
                <Link className="nav-link" to='/pharmacist'>Pharmacist Panel</Link>
              </li>
            }
            { user?.isAdmin &&
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle"
                  data-bs-toggle="dropdown" href="#" role="button" aria-haspopup="true"
                  aria-expanded="false">Admin</a>
                <div className="dropdown-menu">
                  <Link className="dropdown-item" to={ '/admin/doctors' }>Managing Doctors</Link>
                  <Link className="dropdown-item" to={ '/admin/doctors/register' }>Create Doctor Account</Link>
                  <hr />
                  <Link className="dropdown-item" to='/admin/pharmacists'>Managing Pharmacists</Link>
                  <Link className="dropdown-item" to={ '/admin/pharmacists/register' }>Create Pharmacist Account</Link>
                  <hr />
                  <Link className="dropdown-item" to='/admin/patients'>Managing Patients</Link>
            
                </div>
              </li> }
            
            { user?._id &&
              <li className="nav-item">
                <p className="nav-link" onClick={logoutHandler} style={{cursor:'pointer'}}>Logout</p>
              </li>
            }
      </ul>
    </div>
  </div>
</nav>
  )
}

export default Navbar