import React, { useContext, useEffect, useState } from 'react'
import { changeActive, clearCurrentDoctor, getDoctors, setCurrentDoctor, updateDoctor } from '../../contexts/doctors/DoctorsActions'
import { DoctorsContext } from '../../contexts/doctors/DoctorsContext'
import { AuthContext } from '../../contexts/Auth/AuthContext'
import { useNavigate } from 'react-router-dom'

const DoctorsAdmin = () => {

    const { user } = useContext(AuthContext)
    const nav = useNavigate()
    const {doctors,currentDoctor,isLoading,success,dispatch} = useContext(DoctorsContext)
    const [data, setData] = useState({
        name: '',
        password: '',
        phone: '',
        address: '',
        speciality:''
    })

    const onChangeHandler = (e) => {
        setData({...data,[e.target.name]:e.target.value})
    }

    useEffect(() => {
        if (!user || !user.isAdmin) {
          nav('/',{replace:true})
      }
    }, [user])
    

    useEffect(() => {
        clearCurrentDoctor(dispatch)
        getDoctors(dispatch)
    }, [])

    useEffect(() => {
        if (success) {
          getDoctors(dispatch)
        }
    }, [success])
    

    useEffect(() => {
        if (currentDoctor) {
            setData(currentDoctor)
        }
    }, [currentDoctor])

    const onSubmitHandler = (e) => {
        e.preventDefault()
        updateDoctor(data, dispatch)
        clearCurrentDoctor(dispatch)
        setData({
        name: '',
        password: '',
        phone: '',
        address: '',
        speciality:''
    })
    }
    
    

  return (
      <div>
          <h3>Doctors</h3>

          <form className='justify-content-start' style={{minHeight:'300px'}} onSubmit={onSubmitHandler}>
                <div className="form-group my-2">
                    <input type="text" onChange={onChangeHandler} value={data.name} className="form-control" name='name' aria-describedby="emailHelp" placeholder="Enter name"/>
                </div>
            
                <div className="form-group my-2">
                    <input type="text" onChange={onChangeHandler} value={data.password}  className="form-control" name='password'  placeholder="Enter password"/>
                </div>
              
              <div className="form-group my-2">
                    <input type="text" onChange={onChangeHandler} value={data.phone}  className="form-control" name='phone' placeholder="Enter phone number"/>
                </div>
                <div className="form-group my-2">
                    <input type="text" onChange={onChangeHandler} value={data.address} className="form-control" name='address'  placeholder="Enter address"/>
                </div>
                <div className="form-group my-2">
                    <input type="text" onChange={onChangeHandler} value={data.speciality} className="form-control" name='speciality'  placeholder="Enter speciality"/>
                </div>
              
                <div className="form-group my-2">
                  <button type="submit" className="btn btn-primary btn-m"
                      disabled={ isLoading || !currentDoctor}>Update</button>
                </div>
          </form >
          {isLoading?<h2>Loading..</h2>:
          <div className='table-responsive'>
          <table className='table table-hover w-75 mx-auto table-responsive'>
              <thead>
                  <tr className="table-primary">
                      <th>Name</th>
                      <th>Password</th>
                      <th>Phone</th>
                      <th>Speciality</th>
                    <th>Address</th>
                    <th>Active Statue</th>
                      <th>Actions</th>
                  </tr>
                      </thead>
                      <tbody>
                          { doctors.map(doc => (
                              <tr key={doc._id}>
                                <td>{doc.name}</td>
                                <td>{doc.password}</td>
                                <td>{doc.phone}</td>
                                <td>{doc.speciality}</td>
                                  <td>{ doc.address }</td>
                                  <td>{ doc.isActive ? "Active" : 'Not-Active' }</td>
                                  <td className='d-flex justify-content-center'>
                                      <button
                                          className='btn btn-info mx-2'
                                          disabled={ isLoading }
                                          onClick={ () => {
                                              changeActive(doc._id, dispatch)
                                              doc.isActive?
                                                  dispatch({ type: 'SET_DOCTOR_NOT_ACTIVE',payload: doc._id}) :
                                                  dispatch({ type: 'SET_DOCTOR_ACTIVE',payload:doc._id })

                                          } }
                                      >
                                            { doc.isActive ? "Set to Not-Active" : 'Set to Active' }
                                    </button>
                              <button className='btn btn-primary'
                                  onClick={
                                      () => {
                                          document.getElementById('root').scrollIntoView({ behavior: 'smooth' })
                                          setCurrentDoctor(doc,dispatch)
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

export default DoctorsAdmin