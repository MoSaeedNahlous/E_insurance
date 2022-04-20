import axios from 'axios'

export const getDoctors = async (dispatch) => {
    dispatch({ type: 'GET_DOCTORS_REQUEST' })
    try {
        const { data } = await axios.get(
            'https://arcane-garden-68747.herokuapp.com/api/doctors', {
                
                headers: {
                    "authorization":'Bearer '+ JSON.parse(localStorage.getItem('user')).token
                }
            }
        )
        dispatch({ type: "GET_DOCTORS_SUCCESS", payload: data })
    } catch (error) {
        dispatch({type:"GET_DOCTORS_FAIL",payload:error})
    }
}

export const updateDoctor = async (data1,dispatch) => {
    dispatch({ type: "UPDATE_DOCTOR_REQUEST"})
    try {
        
        const { data } = await axios.put(
            `https://arcane-garden-68747.herokuapp.com/api/doctors/${data1._id}/update`, data1 , {
                
                headers: {
                    "authorization":'Bearer '+ JSON.parse(localStorage.getItem('user')).token
                }
            }
        )
        dispatch({ type: "UPDATE_DOCTOR_SUCCESS"})
    } catch (error) {
        console.log(error);
        dispatch({type:"UPDATE_DOCTOR_FAIL",payload:error})
    }
}

export const changeActive = async (id,dispatch) => {

    try {
        const { data } = await axios.put(
            `https://arcane-garden-68747.herokuapp.com/api/doctors/${id}/activeState`,null,{
                headers: {
                    "authorization":'Bearer '+JSON.parse(localStorage.getItem('user')).token
                }
            }
        )
    } catch (error) {
        dispatch({type:"UPDATE_DOCTOR_FAIL",payload:error})
    }
}

export const setCurrentDoctor = async (docObj,dispatch) => {
    dispatch({ type: "SET_CURRENT_DOCTOR", payload: docObj })
}

export const clearCurrentDoctor = async (dispatch) => {
    dispatch({ type: "SET_CURRENT_DOCTOR_RESET"})
}

export const addVisit = async (data1,dispatch) => {
    dispatch({ type: "UPDATE_DOCTOR_REQUEST"})
    try {
        const { data } = await axios.post(
            `https://arcane-garden-68747.herokuapp.com/api/doctors/recordVisit`,data1,{
                headers: {
                    "authorization":'Bearer '+JSON.parse(localStorage.getItem('user')).token
                }
            }
        )
        dispatch({ type: "UPDATE_DOCTOR_SUCCESS"})
    } catch (error) {
        console.log(error.message);
        dispatch({type:"UPDATE_DOCTOR_FAIL",payload:"User Reached his visits limit!"})
    }
}

export const getTotalFeesInDate = async (data1,dispatch) => {
    dispatch({ type: "GET_TOTAL_FEES_REQUEST"})
    try {
        const { data } = await axios.post(
            `https://arcane-garden-68747.herokuapp.com/api/doctors/totalFee`,data1,{
                headers: {
                    "authorization":'Bearer '+JSON.parse(localStorage.getItem('user')).token
                }
            }
        )
        dispatch({ type: "GET_TOTAL_FEES_SUCCESS", payload:data})
    } catch (error) {
        console.log(error.message);
        dispatch({ type: "GET_TOTAL_FEES_FAIL", payload:error})
        
    }
}

