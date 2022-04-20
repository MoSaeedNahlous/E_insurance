import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../contexts/Auth/AuthContext'
import {
    clearCurrentPatient,
    getPatients,
    setCurrentPatient,
    updatePatient,
    searchByName,
    getSum
} from '../../contexts/patients/PatientsActions'
import { PatientsContext } from '../../contexts/patients/PatientsContext'

const PatientsAdmin = () => {
    const navigate = useNavigate()
    const {user} = useContext(AuthContext)
    const {patients,currentPatient,isLoading,success,dispatch,sum} = useContext(PatientsContext)
    const [data, setData] = useState({
        name: '',
        password: '',
        quota: '',
        doctorVisits: '',
    })
    const [search, setSearch] = useState('')

    const onChangeHandler = (e) => {
        setData({...data,[e.target.name]:e.target.value})
    }

    useEffect(() => {
        if (!user || !user.isAdmin) {
          navigate('/',{replace:true})
        }
    }, [user])

    useEffect(() => {
        clearCurrentPatient(dispatch)
        getPatients(dispatch)
    }, [])

    useEffect(() => {
        if (success) {
          getPatients(dispatch)
        }
    }, [success])
    

    useEffect(() => {
        if (currentPatient) {
            setData(currentPatient)
        }
    }, [currentPatient])

    useEffect(() => {
        if (search) {
          searchByName(dispatch,search)
      }
    }, [search])
    

    const onSubmitHandler = (e) => {
        e.preventDefault()
        updatePatient(data, dispatch)
        clearCurrentPatient(dispatch)
        setData({
        name: '',
        password: '',
        quota: '',
        doctorVisits: '',
    })
    }
    
    

  return (
      <div>
          <h3>Patients</h3>

          <form className='justify-content-start' style={{minHeight:'300px'}} onSubmit={onSubmitHandler}>
                <div className="form-group my-2">
                    <input type="text" onChange={onChangeHandler} value={data.name} className="form-control" name='name' aria-describedby="emailHelp" placeholder="Enter name"/>
                </div>
            
                <div className="form-group my-2">
                    <input type="text" onChange={onChangeHandler} value={data.password}  className="form-control" name='password'  placeholder="Enter password"/>
                </div>
              
              <div className="form-group my-2">
                    <input type="number" onChange={onChangeHandler} value={data.quota}  className="form-control" name='quota' placeholder="Enter quota number"/>
                </div>
                <div className="form-group my-2">
                    <input type="number" onChange={onChangeHandler} value={data.doctorVisits} className="form-control" name='doctorVisits'  placeholder="Enter doctor visits"/>
                </div>
              <div className="form-group my-2">
                    <input disabled type="text" value={sum !== null ?"Sum of paid value: "+sum:'Select patient from the table first to view total sum of paid value'} className="form-control"   placeholder="Select patient from the table first to view total sum of paid value"/>
                </div>
                <div className="form-group my-2">
                  <button type="submit" className="btn btn-primary btn-m"
                      disabled={ isLoading || !currentPatient}>Update</button>
                </div>
          </form >
          <div className="form-group my-2 w-50 mx-auto d-flex align-items-center mb-4">
              <input type="text" onChange={(e)=> setSearch(e.target.value)} value={ search } className="form-control"  aria-describedby="emailHelp" placeholder="Enter patient name to search..." />
              <button className="btn btn-primary btn-m">Search</button>
            </div>
          {isLoading?<h2>Loading..</h2>:
          <div className='table-responsive'>
          <table className='table table-hover w-75 mx-auto table-responsive'>
              <thead>
                  <tr className="table-primary">
                        <th>Name</th>
                        <th>Password</th>
                        <th>Insurance Number</th>
                        <th>Quota</th>
                        <th>Doctor Visits</th>
                        <th>Actions</th>
                  </tr>
                      </thead>
                      <tbody>
                          { patients.map(doc => (
                              <tr key={doc._id}>
                                <td>{doc.name}</td>
                                <td>{doc.password}</td>
                                <td>{ doc.insuranceNumber }</td>
                                <td>{ doc.quota }</td>
                                  <td>{ doc.doctorVisits }</td>
                                
                                <td className='d-flex justify-content-center'>

                              <button className='btn btn-primary'
                                  onClick={
                                      () => {
                                          document.getElementById('root').scrollIntoView({ behavior: 'smooth' })
                                          setCurrentPatient(doc, dispatch)
                                          getSum(dispatch,doc._id)
                                      } }
                              >Select</button>
                              
                          </td>
                              </tr>
                          ))}
                      </tbody>
              </table>
          </div>}
    </div>
  )
}

export default PatientsAdmin