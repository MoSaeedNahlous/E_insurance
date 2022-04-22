import { Alert, CircularProgress } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate,Link } from 'react-router-dom'
import { doctorRegister, patientRegister } from '../../contexts/Auth/AuthActions'
import { AuthContext } from '../../contexts/Auth/AuthContext'

const PatientReg = () => {
    const navigate = useNavigate()
    const {dispatch,user,isLoading,error} = useContext(AuthContext)
    const [data, setData] = useState({
        name: "",
        password: "",
    })

    const onChangeHandler = (e) => {
        setData({...data,[e.target.name]:e.target.value})
    }

    const onSubmitHandler = (e) => {
        e.preventDefault()
        patientRegister(data,dispatch)
    }

    useEffect(() => {
        dispatch({type:'LOGIN_RESET'})
        if (user) {
          navigate('/',{replace:true})
        }
    }, [user])
    

  return (
      <div>
          { error && <Alert severity="error">{ error }</Alert>}
          <form onSubmit={onSubmitHandler} >
              <h2>Patient Register</h2>
                <div className="form-group">
                    <input type="text" onChange={onChangeHandler} value={data.name} className="form-control" name='name' aria-describedby="emailHelp" placeholder="Enter name"/>
                </div>
                <div className="form-group">
                    <input type="password" onChange={onChangeHandler} value={data.password}  className="form-control" name='password'  placeholder="Enter password"/>
                </div>
                <div className="form-group">
                  <button type="submit" className="btn btn-primary btn-lg"
                  disabled={ isLoading }
          >
            {isLoading ? <CircularProgress /> :"Register"}
                  </button>
                  <br />
                  <small>Have an account?<Link to='/patient/login'>Login here!</Link></small>
                </div>
          </form >
      </div>
      
          
  )
}

export default PatientReg