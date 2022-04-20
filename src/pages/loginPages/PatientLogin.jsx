import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { doctorLogin, patientLogin } from '../../contexts/Auth/AuthActions'
import { AuthContext } from '../../contexts/Auth/AuthContext'

const PatientLogin = () => {

    const navigate = useNavigate()
    const {dispatch,user} = useContext(AuthContext)
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
        if (user) {
          navigate('/',{replace:true})
        }
    }, [user])

  return (
    <div>
          <form onSubmit={onSubmitHandler} >
              <h2>Patient Login</h2>
                <div className="form-group">
                    <input type="text" onChange={onChangeHandler} value={data.name} className="form-control" name='name' aria-describedby="emailHelp" placeholder="Enter name"/>
                </div>
            
                <div className="form-group">
                    <input type="password" onChange={onChangeHandler} value={data.password}  className="form-control" name='password'  placeholder="Enter password"/>
                </div>
              
                <div className="form-group">
                  <button type="submit" className="btn btn-primary btn-lg">Login</button>
                  <br />
                  <small>Don't have an account?<Link to='/patient/register'>Signup here!</Link></small>
                </div>
          </form >
      </div>
  )
}

export default PatientLogin