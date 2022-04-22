import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { doctorLogin } from '../../contexts/Auth/AuthActions'
import { AuthContext } from '../../contexts/Auth/AuthContext'
import {Alert, CircularProgress } from '@mui/material'

const DoctorLogin = () => {

    const navigate = useNavigate()
    const {dispatch:dis,user,isLoading,error} = useContext(AuthContext)
    const [data, setData] = useState({
        name: "",
        password: '',

    })

    const onChangeHandler = (e) => {
        setData({...data,[e.target.name]:e.target.value})
    }

    const onSubmitHandler = (e) => {
        e.preventDefault()
        doctorLogin(data,dis)
    }

  useEffect(() => {
      dis({type:'LOGIN_RESET'})
        if (user) {
          navigate(`/${user.role}`,{replace:true})
        }
    }, [user])

  return (
    <div>
      { error && <Alert severity="error">{ error.response.data.message }</Alert>}
          <form onSubmit={onSubmitHandler} >
              <h2>Doctor Login</h2>
                <div className="form-group">
                    <input type="text" onChange={onChangeHandler} value={data.name} className="form-control" name='name' aria-describedby="emailHelp" placeholder="Enter name"/>
                </div>
            
                <div className="form-group">
                    <input type="password" onChange={onChangeHandler} value={data.password}  className="form-control" name='password'  placeholder="Enter password"/>
                </div>
              
                <div className="form-group">
          <button type="submit"
            
            className="btn btn-primary btn-lg"
            disabled={ isLoading }
          >
            {isLoading ? <CircularProgress /> :"Login"}
            
          </button>
                </div>
          </form >
      </div>
  )
}

export default DoctorLogin