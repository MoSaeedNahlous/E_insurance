import React, { useContext, useEffect, useState } from 'react'
import { useNavigate,Link } from 'react-router-dom'
import { doctorRegister } from '../../contexts/Auth/AuthActions'
import { AuthContext } from '../../contexts/Auth/AuthContext'
import classes from './registerForm.module.css'

const DoctorReg = () => {
    const navigate = useNavigate()
    const {dispatch,user} = useContext(AuthContext)
    const [data, setData] = useState({
        name: "",
        phone: "",
        speciality: '',
        password: '',
        address:''
    })

    const onChangeHandler = (e) => {
        setData({...data,[e.target.name]:e.target.value})
    }

    const onSubmitHandler = (e) => {
        e.preventDefault()
        doctorRegister(data,dispatch)
    }

    useEffect(() => {
        if (!user || !user.isAdmin) {
          navigate('/',{replace:true})
        }
    }, [user])
    

  return (
      <div>
          <form onSubmit={onSubmitHandler} >
              <h2>Create Doctor Account</h2>
                <div className="form-group">
                    <input type="text" onChange={onChangeHandler} value={data.name} className="form-control" name='name' aria-describedby="emailHelp" placeholder="Enter name"/>
                </div>
            
                <div className="form-group">
                    <input type="password" onChange={onChangeHandler} value={data.password}  className="form-control" name='password'  placeholder="Enter password"/>
              </div>
              
              <div className="form-group">
                    <input type="text" onChange={onChangeHandler} value={data.phone}  className="form-control" name='phone' placeholder="Enter phone number"/>
                </div>
                <div className="form-group">
                    <input type="text" onChange={onChangeHandler} value={data.address} className="form-control" name='address'  placeholder="Enter address"/>
                </div>
                <div className="form-group">
                    <input type="text" onChange={onChangeHandler} value={data.speciality} className="form-control" name='speciality'  placeholder="Enter speciality"/>
                </div>
              
                <div className="form-group">
                  <button type="submit" className="btn btn-primary btn-lg">Create</button>
                </div>
          </form >
      </div>
      
          
  )
}

export default DoctorReg