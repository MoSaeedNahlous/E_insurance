import React, { useContext, useEffect, useState } from 'react'
import { searchForDoctor, searchForPharmacist } from '../../contexts/patients/PatientsActions'
import { PatientsContext } from '../../contexts/patients/PatientsContext'
import {AuthContext } from '../../contexts/Auth/AuthContext'
import { useNavigate } from 'react-router-dom'
import { Alert, CircularProgress } from '@mui/material'

const PatientPanel = () => {
    const { dispatch, isLoading, searchPharmacists, searchDoctors,error } = useContext(PatientsContext)
    const { user } = useContext(AuthContext)
    const nav =useNavigate()

    useEffect(() => {
        dispatch({type:'GET_PHARMACISTS_RESET'})
        if (!user || user.role !== 'patient') {
            nav('/',{replace:true})
        }
    }, [user])
    
useEffect(() => {
    searchForPharmacist(dispatch)
    searchForDoctor(dispatch)
}, [])


  return (
      <div>
          { error && <Alert severity="error">{ error.response.data.message }</Alert> }
          <h2>Active Pharmacist</h2>
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
          <h2>Active Doctors</h2>   
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