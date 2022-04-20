import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../contexts/Auth/AuthContext'
import { changeActive, clearCurrentPharmacist, getPharmacists, setCurrentPharmacist, updatePharmacist } from '../../contexts/pharmacists/PharmacistsActions'
import { PharmacistsContext } from '../../contexts/pharmacists/PharmacistsContext'

const PharmacistsAdmin = () => {
    const navigate = useNavigate()
    const {user} = useContext(AuthContext)
    const {pharmacists,currentPharmacist,isLoading,success,dispatch} = useContext(PharmacistsContext)
    const [data, setData] = useState({
        name: '',
        password: '',
        phone: '',
        address: '',
    })

    const onChangeHandler = (e) => {
        setData({...data,[e.target.name]:e.target.value})
    }

    useEffect(() => {
        if (!user || !user.isAdmin) {
          navigate('/',{replace:true})
      }
    }, [user])

    useEffect(() => {
        clearCurrentPharmacist(dispatch)
        getPharmacists(dispatch)
    }, [])

    useEffect(() => {
        if (success) {
          getPharmacists(dispatch)
        }
    }, [success])
    

    useEffect(() => {
        if (currentPharmacist) {
            setData(currentPharmacist)
        }
    }, [currentPharmacist])

    const onSubmitHandler = (e) => {
        e.preventDefault()
        updatePharmacist(data, dispatch)
        clearCurrentPharmacist(dispatch)
        setData({
        name: '',
        password: '',
        phone: '',
        address: '',
    })
    }
    
    

  return (
      <div>
          <h3>Pharmacists</h3>

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
                  <button type="submit" className="btn btn-primary btn-m"
                      disabled={ isLoading || !currentPharmacist}>Update</button>
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
                    <th>Address</th>
                    <th>Active Statue</th>
                      <th>Actions</th>
                  </tr>
                      </thead>
                      <tbody>
                          { pharmacists.map(doc => (
                              <tr key={doc._id}>
                                <td>{doc.name}</td>
                                <td>{doc.password}</td>
                                <td>{doc.phone}</td>
                                  <td>{ doc.address }</td>
                                  <td>{ doc.isActive ? "Active" : 'Not-Active' }</td>
                                  <td className='d-flex justify-content-center'>
                                      <button
                                          className='btn btn-info mx-2'
                                          disabled={ isLoading }
                                          onClick={ () => {
                                              changeActive(doc._id, dispatch)
                                              doc.isActive?
                                                  dispatch({ type: 'SET_PHARMACIST_NOT_ACTIVE',payload: doc._id}) :
                                                  dispatch({ type: 'SET_PHARMACIST_ACTIVE',payload:doc._id })

                                          } }
                                      >
                                            { doc.isActive ? "Set to Not-Active" : 'Set to Active' }
                                    </button>
                              <button className='btn btn-primary'
                                  onClick={
                                      () => {
                                          document.getElementById('root').scrollIntoView({ behavior: 'smooth' })
                                          setCurrentPharmacist(doc,dispatch)
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

export default PharmacistsAdmin