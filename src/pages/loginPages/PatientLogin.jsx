import { Alert, CircularProgress } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { doctorLogin, patientLogin } from '../../contexts/Auth/AuthActions'
import { AuthContext } from '../../contexts/Auth/AuthContext'

const PatientLogin = () => {

    const navigate = useNavigate()
    const {dispatch,user,error,isLoading} = useContext(AuthContext)
    const [data, setData] = useState({
        name: "",
        password: '',

    })

    const onChangeHandler = (e) => {
        setData({...data,[e.target.name]:e.target.value})
    }

    const onSubmitHandler = (e) => {
        e.preventDefault()
        patientLogin(data,dispatch)
    }

  useEffect(() => {
      dispatch({type:'LOGIN_RESET'})
        if (user) {
          navigate('/',{replace:true})
        }
    }, [user])

  return (
    <div>
      { error && <Alert severity="error">{ error.response.data.message }</Alert>}
          <form onSubmit={onSubmitHandler} >
              <h2>Patient Login</h2>
                <div className="form-group">
                    <input type="text" onChange={onChangeHandler} value={data.name} className="form-control" name='name' aria-describedby="emailHelp" placeholder="Enter name"/>
                </div>
            
                <div className="form-group">
                    <input type="password" onChange={onChangeHandler} value={data.password}  className="form-control" name='password'  placeholder="Enter password"/>
                </div>
              
                <div className="form-group">
                  <button type="submit"
            disabled={isLoading}
            className="btn btn-primary btn-lg">
            {isLoading ? <CircularProgress /> :"Login"}
            
          </button>
                  <br />
                  <small>Don't have an account?<Link to='/patient/register'>Signup here!</Link></small>
                </div>
          </form >
      </div>
  )
}

export default PatientLogin