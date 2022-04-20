import axios from 'axios'

export const doctorRegister = async (body,dispatch) => {
    dispatch({ type: 'LOAD_REQUEST' })
    try {
        const { data } = await axios.post(
            'https://arcane-garden-68747.herokuapp.com/api/doctors/signup', body
        )
        dispatch({ type: "SIGNUP_SUCCESS", payload: data })
        localStorage.setItem("user",JSON.stringify(data))
    } catch (error) {
        dispatch({type:"SIGNUP_FAIL",payload:error})
    }
}

export const logout = async (dispatch) => {
    dispatch({ type: 'LOGOUT' })

}
export const doctorLogin = async (body,dispatch) => {
    dispatch({ type: 'LOAD_REQUEST' })
    try {
        const { data } = await axios.post(
            'https://arcane-garden-68747.herokuapp.com/api/doctors/login', body
        )
        dispatch({ type: "LOGIN_SUCCESS", payload: data })
        localStorage.setItem("user",JSON.stringify(data))
    } catch (error) {
        dispatch({type:"LOGIN_FAIL",payload:error})
    }
}


export const patientRegister = async (body,dispatch) => {
    dispatch({ type: 'LOAD_REQUEST' })
    try {
        const { data } = await axios.post(
            'https://arcane-garden-68747.herokuapp.com/api/patients/signup', body
        )
        dispatch({ type: "SIGNUP_SUCCESS", payload: data })
        localStorage.setItem("user",JSON.stringify(data))
    } catch (error) {
        dispatch({type:"SIGNUP_FAIL",payload:error})
    }
}

export const patientLogin = async (body,dispatch) => {
    dispatch({ type: 'LOAD_REQUEST' })
    try {
        const { data } = await axios.post(
            'https://arcane-garden-68747.herokuapp.com/api/patients/login', body
        )
        dispatch({ type: "LOGIN_SUCCESS", payload: data })
        localStorage.setItem("user",JSON.stringify(data))
    } catch (error) {
        dispatch({type:"LOGIN_FAIL",payload:error})
    }
}


export const pharmacistRegister = async (body,dispatch) => {
    dispatch({ type: 'LOAD_REQUEST' })
    try {
        const { data } = await axios.post(
            'https://arcane-garden-68747.herokuapp.com/api/pharmacists/signup', body
        )
        dispatch({ type: "SIGNUP_SUCCESS", payload: data })
        localStorage.setItem("user",JSON.stringify(data))
    } catch (error) {
        dispatch({type:"SIGNUP_FAIL",payload:error})
    }
}

export const pharmacistLogin = async (body,dispatch) => {
    dispatch({ type: 'LOAD_REQUEST' })
    try {
        const { data } = await axios.post(
            'https://arcane-garden-68747.herokuapp.com/api/pharmacists/login', body
        )
        dispatch({ type: "LOGIN_SUCCESS", payload: data })
        localStorage.setItem("user",JSON.stringify(data))
    } catch (error) {
        dispatch({type:"LOGIN_FAIL",payload:error})
    }
}