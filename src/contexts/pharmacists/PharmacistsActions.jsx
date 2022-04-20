import axios from 'axios'

export const getPharmacists = async (dispatch) => {
    dispatch({ type: 'GET_PHARMACISTS_REQUEST' })
    try {
        const { data } = await axios.get(
            'https://arcane-garden-68747.herokuapp.com/api/pharmacists', {
                
                headers: {
                    "authorization":'Bearer '+ JSON.parse(localStorage.getItem('user')).token
                }
            }
            
        )
        dispatch({ type: "GET_PHARMACISTS_SUCCESS", payload: data })
    } catch (error) {
        dispatch({type:"GET_PHARMACISTS_FAIL",payload:error})
    }
}

export const getDrugs = async (dispatch) => {
    dispatch({ type: 'GET_DRUGS_REQUEST' })
    try {
        const { data } = await axios.get(
            'https://arcane-garden-68747.herokuapp.com/api/drugs'
            
        )
        dispatch({ type: "GET_DRUGS_SUCCESS", payload: data })
    } catch (error) {
        dispatch({type:"GET_DRUGS_FAIL",payload:error})
    }
}

export const updatePharmacist = async (data1,dispatch) => {
    dispatch({ type: "UPDATE_PHARMACIST_REQUEST"})
    try {
        
        const { data } = await axios.put(
            `https://arcane-garden-68747.herokuapp.com/api/pharmacists/${data1._id}/update`, data1 , {
                
                headers: {
                    "authorization":'Bearer '+ JSON.parse(localStorage.getItem('user')).token
                }
            }
        )
        dispatch({ type: "UPDATE_PHARMACIST_SUCCESS"})
    } catch (error) {
        console.log(error);
        dispatch({type:"UPDATE_PHARMACIST_FAIL",payload:error})
    }
}

export const changeActive = async (id,dispatch) => {

    try {
        const { data } = await axios.put(
            `https://arcane-garden-68747.herokuapp.com/api/pharmacists/${id}/activeState`,null,{
                headers: {
                    "authorization":'Bearer '+JSON.parse(localStorage.getItem('user')).token
                }
            }
        )
    } catch (error) {
        dispatch({type:"UPDATE_PHARMACIST_FAIL",payload:error})
    }
}

export const setCurrentPharmacist = async (docObj,dispatch) => {
    dispatch({ type: "SET_CURRENT_PHARMACIST", payload: docObj })
}

export const clearCurrentPharmacist = async (dispatch) => {
    dispatch({ type: "SET_CURRENT_PHARMACIST_RESET"})
}

export const createPrescription = async (data1,dispatch) => {
    dispatch({ type: "CREATE_PRESCRIPTION_REQUEST"})
    try {
        const { data } = await axios.post(
            `https://arcane-garden-68747.herokuapp.com/api/pharmacists/createPrescription`, data1 , {
                
                headers: {
                    "authorization":'Bearer '+ JSON.parse(localStorage.getItem('user')).token
                }
            }
        )
        dispatch({ type: "CREATE_PRESCRIPTION_SUCCESS"})
    } catch (error) {
        console.log(error);
        dispatch({type:"CREATE_PRESCRIPTION_FAIL",payload:"The User will exceed his quota limit!"})
    }
}

export const getTotalPriceInDate = async (data1,dispatch) => {
    dispatch({ type: "GET_TOTAL_PRICE_REQUEST"})
    try {
        const { data } = await axios.post(
            `https://arcane-garden-68747.herokuapp.com/api/pharmacists/getPrescriptionFee`,data1,{
                headers: {
                    "authorization":'Bearer '+JSON.parse(localStorage.getItem('user')).token
                }
            }
        )
        dispatch({ type: "GET_TOTAL_PRICE_SUCCESS", payload:data})
    } catch (error) {
        console.log(error.message);
        dispatch({ type: "GET_TOTAL_PRICE_FAIL", payload:error})
        
    }
}