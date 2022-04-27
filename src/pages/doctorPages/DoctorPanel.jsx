import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../contexts/Auth/AuthContext'
import { addVisit, getTotalFeesInDate } from '../../contexts/doctors/DoctorsActions'
import { DoctorsContext } from '../../contexts/doctors/DoctorsContext'
import { getPatients } from '../../contexts/patients/PatientsActions'
import { PatientsContext } from '../../contexts/patients/PatientsContext'
import { Alert, CircularProgress } from '@mui/material'

const DoctorPanel = () => {

    const { doctors, isLoading, success, dispatch, error, totalFees } = useContext(DoctorsContext)
    const { user } = useContext(AuthContext)
    const nav = useNavigate()
    const {patients,isLoading:load,dispatch:dis} = useContext(PatientsContext)
    const [data, setData] = useState({
        fee: '',
        disease: '',
        date: '',
        patientId:''
    })
    const [date, setDate] = useState('')

    const onChangeHandler = (e) => {
        setData({...data,[e.target.name]:e.target.value})
    }
    
    useEffect(() => {
        dispatch({type:"RESET"})
        if (user && user.role === 'doctor') {
            getPatients(dis)
        } else {
            nav('/doctor/login',{replace:true})
        }
      
    }, [user])

    

    


    const onSubmitHandler = (e) => {
        e.preventDefault()
        addVisit(data, dispatch)
        setData({
        fee: '',
        disease: '',
        date: '',
        patientId:''
    })
    }

    const onSubmitHandler2 = (e) => {
        e.preventDefault()
        getTotalFeesInDate({ date }, dispatch)
        setDate('')
    }

    
    
    

  return (
      <div>
          { error && <Alert severity="error">{ error.response.data.message }</Alert>}
          <h3>Doctor Panel</h3>

          <form className='justify-content-start' style={{minHeight:'300px'}} onSubmit={onSubmitHandler}>
                <h5>Record Visit</h5>
              <div className="form-group my-2">
                    <input required type="text" onChange={onChangeHandler} value={data.disease} className="form-control" name='disease' aria-describedby="emailHelp" placeholder="Enter Disease"/>
                </div>
            
                <div className="form-group my-2">
                    <input required type="number" onChange={onChangeHandler} value={data.fee}  className="form-control" name='fee'  placeholder="Enter Fee"/>
                </div>
              
              <div className="form-group my-2">
                    <input required type="date" onChange={onChangeHandler} value={data.date}  className="form-control" name='date' placeholder="Enter Date"/>
                </div>
                <div className="form-group my-2">
                    <select  required className="form-select" aria-label="Default select example" name='patientId' onChange={onChangeHandler} value={data.patientId}>
                        
                      { !load && patients.map(patient => (
                          <option key={ patient._id } value={ patient._id }>{ patient.name }</option>
                        ))}
                    </select>
                </div>
             
                <div className="form-group my-2">
                  <button type="submit" className="btn btn-primary btn-m"
                      disabled={ isLoading }>Add Visit</button>
              </div>
              
          </form >
          <hr />
          <form onSubmit={onSubmitHandler2}  className='d-flex flex-column justify-content-start'  style={{minHeight:'100px'}}>
              <h2>Search for total fees in specifc date</h2>
              <input type="date" onChange={ e => { setDate(e.target.value) } } value={ date } className="form-control" name='date' placeholder="Enter Date" />
              <button type="submit" className="btn btn-primary btn-lg">Search</button>
          </form >

        
              <h3>Total fees is: { totalFees.totalFee }</h3>
          
          
    </div>  
  )
}

export default DoctorPanel