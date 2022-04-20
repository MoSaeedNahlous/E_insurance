import React, { useContext, useEffect, useState } from 'react'
import { searchForDoctor, searchForPharmacist } from '../../contexts/patients/PatientsActions'
import { PatientsContext } from '../../contexts/patients/PatientsContext'
import {AuthContext } from '../../contexts/Auth/AuthContext'
import { useNavigate } from 'react-router-dom'

const PatientPanel = () => {
    const { dispatch, isLoading, searchPharmacists, searchDoctors } = useContext(PatientsContext)
    const { user } = useContext(AuthContext)
    const nav =useNavigate()

    const [location, setLocation] = useState('')
    const [location2, setLocation2] = useState('')
    const [speciality, setSpeciality] = useState('')

    useEffect(() => {
        if (!user || user.role !== 'patient') {
            nav('/',{replace:true})
        }
    }, [user])
    

    const onSubmitHandler = (e) => {
        e.preventDefault()
        searchForPharmacist(dispatch,location)
        setLocation('')
    }

    const onSubmitHandler2 = (e) => {
        e.preventDefault()
        searchForDoctor(dispatch,location2,speciality)
        setLocation2('')
        setSpeciality('')
    }
  return (
      <div>
          <form onSubmit={onSubmitHandler} className='d-flex flex-column justify-content-start'  style={{minHeight:'200px'}}>
              <h2>Search for Active Pharmacist</h2>
                  <input type="text" onChange={ e => { setLocation(e.target.value) } } value={ location } className="form-control" name='location' placeholder="Enter location" />
                  <button type="submit" className="btn btn-primary btn-lg">Search</button>
          </form >
          
          <div className='table-responsive'>
          <table className='table table-hover w-75 mx-auto table-responsive'>
              <thead>
                  <tr className="table-primary">
                    <th>Name</th>
                    <th>Phone</th>
                    <th>Address</th>
                  </tr>
                      </thead>
                      <tbody>
                          {!isLoading && searchPharmacists.map(ph => (
                              <tr key={ph._id}>
                                <td>{ph.name}</td>
                                <td>{ph.phone}</td>
                                  <td>{ ph.address }</td>
                              </tr>
                          ))}
                      </tbody>
              </table>
          </div>
<hr />
          <form onSubmit={onSubmitHandler2} className='d-flex flex-column justify-content-start'  style={{minHeight:'200px'}}>
              <h2>Search for Active Doctors</h2>
              <input type="text" onChange={ e => { setLocation2(e.target.value) } } value={ location2 } className="form-control" name='location' placeholder="Enter location" />
              <input type="text" onChange={ e => { setSpeciality(e.target.value) } } value={ speciality } className="form-control" name='speciality' placeholder="Enter speciality" />
                  <button type="submit" className="btn btn-primary btn-lg">Search</button>
          </form >
          
          <div className='table-responsive'>
          <table className='table table-hover w-75 mx-auto table-responsive'>
              <thead>
                  <tr className="table-primary">
                          <th>Name</th>
                          <th>Speciality</th>
                    <th>Phone</th>
                          <th>Address</th>
                          
                  </tr>
                      </thead>
                      <tbody>
                          {!isLoading && searchDoctors.map(doc => (
                              <tr key={doc._id}>
                                  <td>{ doc.name }</td>
                                  <td>{doc.speciality}</td>
                                <td>{doc.phone}</td>
                                  <td>{ doc.address }</td>
                              </tr>
                          ))}
                      </tbody>
              </table>
          </div>
    </div>
  )
}

export default PatientPanel