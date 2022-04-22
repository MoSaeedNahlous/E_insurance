import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../contexts/Auth/AuthContext'
import { getPatients } from '../../contexts/patients/PatientsActions'
import { PatientsContext } from '../../contexts/patients/PatientsContext'
import { createPrescription, getDrugs, getTotalPriceInDate } from '../../contexts/pharmacists/PharmacistsActions'
import { PharmacistsContext } from '../../contexts/pharmacists/PharmacistsContext'
import { Alert, CircularProgress } from '@mui/material'

const PharmacistPanel = () => {

    const { user } = useContext(AuthContext)
    const nav =useNavigate()
    const {  isLoading, success, dispatch, error,drugs,totalPrice } = useContext(PharmacistsContext)
    const {patients,isLoading:load,dispatch:dis} = useContext(PatientsContext)
    const [data, setData] = useState({
        paidValue: '',
        drugId: '',
        date: '',
        patientId:''
    })

    const [date , setDate] = useState('')

    const onChangeHandler = (e) => {
        setData({...data,[e.target.name]:e.target.value})
    }

    useEffect(() => {
        dispatch({type:'RESET'})
        if (!user || user.role !== 'pharmacist') {
            nav('/pharmacist/login',{replace:true})
        }
      
    }, [user])

    useEffect(() => {
        getPatients(dis)
        getDrugs(dispatch)
    }, [])

    const onSubmitHandler = (e) => {
        e.preventDefault()
        createPrescription(data, dispatch)
        setData({
        paidValue: '',
        drugId: '',
        date: '',
        patientId:''
    })
    }

    const onSubmitHandler2 = (e) => {
        e.preventDefault()
        getTotalPriceInDate({ date }, dispatch)
        setDate('')
    }
    

  return (
      <div>
          { error && <Alert severity="error">{ error.response.data.message }</Alert>}
          <h3>Pharmacist Panel</h3>

          <form className='justify-content-start' style={ { minHeight: '300px' } } onSubmit={ onSubmitHandler }>
              <h5>Create Prescription </h5>
                <div className="form-group my-2">
                    <select  required className="form-select" aria-label="Default select example" name='drugId' onChange={onChangeHandler} value={data.drugId}>
                      { !isLoading && drugs.map(drug => (
                          <option key={ drug._id } value={ drug._id }>{ drug.name }</option>
                        ))}
                    </select>
                </div>
                <div className="form-group my-2">
                    <input required type="number" onChange={onChangeHandler} value={data.paidValue}  className="form-control" name='paidValue'  placeholder="Enter paid value"/>
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
                      disabled={ isLoading }>Add Prescription</button>
              </div>
              {/* { error && <h6 className='text-center'>{error}</h6>} */}
          </form >

           <hr />
          <form onSubmit={onSubmitHandler2}  className='d-flex flex-column justify-content-start'  style={{minHeight:'100px'}}>
              <h2>Search for total prices for all Prescription during a specific date</h2>
              <input type="date" onChange={ e => { setDate(e.target.value) } } value={ date } className="form-control" name='date' placeholder="Enter Date" />
              <button type="submit" className="btn btn-primary btn-lg">Search</button>
          </form >

        
              <h3>Total price is: { totalPrice }</h3>
          
    </div>
  )
}

export default PharmacistPanel