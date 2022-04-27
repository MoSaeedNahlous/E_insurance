import axios from 'axios'

export const getPatients = async (dispatch) => {
    dispatch({ type: 'GET_PATIENTS_REQUEST' })
    try {
        const { data } = await axios.get(
            'https://arcane-garden-68747.herokuapp.com/api/patients',{
                
                headers: {
                    "authorization":'Bearer '+ JSON.parse(localStorage.getItem('user')).token
                }
            }
            
        )
        dispatch({ type: "GET_PATIENTS_SUCCESS", payload: data })
    } catch (error) {
        dispatch({type:"GET_PATIENTS_FAIL",payload:error})
    }
}

export const updatePatient = async (data1,dispatch) => {
    dispatch({ type: "UPDATE_PATIENT_REQUEST"})
    try {
        
        const { data } = await axios.put(
            `https://arcane-garden-68747.herokuapp.com/api/patients/${data1._id}/update`, data1 , {
                
                headers: {
                    "authorization":'Bearer '+ JSON.parse(localStorage.getItem('user')).token
                }
            }
        )
        dispatch({ type: "UPDATE_PATIENT_SUCCESS"})
    } catch (error) {
        console.log(error);
        dispatch({type:"UPDATE_PATIENT_FAIL",payload:error})
    }
}

export const setCurrentPatient = async (docObj,dispatch) => {
    dispatch({ type: "SET_CURRENT_PATIENT", payload: docObj })
}

export const clearCurrentPatient = async (dispatch) => {
    dispatch({ type: "SET_CURRENT_PATIENT_RESET"})
}

export const searchByName = async (dispatch, name) => {
    dispatch({ type: 'GET_PATIENTS_REQUEST' })
    try {
        const { data } = await axios.get(
            `https://arcane-garden-68747.herokuapp.com/api/patients/search?name=${name}`, {  
                headers: {
                    "authorization":'Bearer '+ JSON.parse(localStorage.getItem('user')).token
                }
            }
            
        )
        dispatch({ type: "GET_PATIENTS_SUCCESS", payload: data })
    } catch (error) {
        dispatch({type:"GET_PATIENTS_FAIL",payload:error})
    }
}

export const getSum = async (dispatch, id) => {
    dispatch({ type: 'GET_PATIENT_SUM_REQUEST' })
    try {
        const { data } = await axios.get(
            `https://arcane-garden-68747.herokuapp.com/api/patients/${id}/totalPaid`, {  
                headers: {
                    "authorization":'Bearer '+ JSON.parse(localStorage.getItem('user')).token
                }
            }
            
        )
        dispatch({ type: "GET_PATIENT_SUM_SUCCESS", payload: data })
    } catch (error) {
        dispatch({type:"GET_PATIENT_SUM_FAIL",payload:error})
    }
}

// TESTED
export const searchForPharmacist = async (dispatch) => {
    dispatch({ type: 'GET_PHARMACISTS_REQUEST' })
    try {
        const { data } = await axios.get(
            `https://arcane-garden-68747.herokuapp.com/api/pharmacists/search`                       
        )
        dispatch({ type: "GET_PHARMACISTS_SUCCESS", payload: data })
    } catch (error) {
        dispatch({type:"GET_PHARMACISTS_FAIL",payload:error})
    }
}

// TESTED
export const searchForDoctor = async (dispatch) => {
    dispatch({ type: 'GET_DOCTORS_REQUEST' })
    var url = 'https://arcane-garden-68747.herokuapp.com/api/doctors/search?'
    try {
        const { data } = await axios.get(
            url                       
        )
        dispatch({ type: "GET_DOCTORS_SUCCESS", payload: data })
    } catch (error) {
        dispatch({type:"GET_DOCTORS_FAIL",payload:error})
    }
}