const PatientsReducer = (state, action) => {
  switch (action.type) {
    case 'GET_PATIENTS_REQUEST':
      return {...state,
        patients:[],
        isLoading: true,
        error: false,
      };
    case 'GET_PATIENTS_SUCCESS':
      return {
        ...state,
        patients:action.payload,
        isLoading: false,
        error: false,
      };
    case 'GET_PATIENTS_FAIL':
      return {
        ...state,
        patients:[],
        isLoading: false,
        error: action.payload,
      };
    
      case 'UPDATE_PATIENT_REQUEST':
      return {...state,
        isLoading: true,
        error: false,
      };
    case 'UPDATE_PATIENT_SUCCESS':
      return {
        ...state,
        success:true,
        isLoading: false,
        error: false,
      };
    case 'UPDATE_PATIENT_FAIL':
      return {
        ...state,
        isLoading: false,
        success:false,
        error: action.payload,
      };
    case 'GET_PATIENT_SUM_REQUEST':
      return {
        ...state,
        sum:null,
        isLoading: true,
        error: false,
      };
    case 'GET_PATIENT_SUM_SUCCESS':
      return {
        ...state,
        sum:action.payload,
        isLoading: false,
        error: false,
      };
    case 'GET_PATIENT_SUM_FAIL':
      return {
        ...state,
        sum:null,
        isLoading: false,
        success:false,
        error: action.payload,
      };
    case 'GET_PHARMACISTS_REQUEST':
      return {
        ...state,
        searchPharmacists:[],
        isLoading: true,
        error: false,
      };
    case 'GET_PHARMACISTS_SUCCESS':
      return {
        ...state,
        searchPharmacists:action.payload,
        isLoading: false,
        error: false,
      };
    case 'GET_PHARMACISTS_FAIL':
      return {
        ...state,
        searchPharmacists:[],
        isLoading: false,
        error: action.payload,
      };
    case 'GET_DOCTORS_REQUEST':
      return {
        ...state,
        searchDoctors:[],
        isLoading: true,
        error: false,
      };
    case 'GET_DOCTORS_SUCCESS':
      return {
        ...state,
        searchDoctors:action.payload,
        isLoading: false,
        error: false,
      };
    case 'GET_DOCTORS_FAIL':
      return {
        ...state,
        searchDoctors:[],
        isLoading: false,
        error: action.payload,
      };
    case 'SET_CURRENT_PATIENT':
      return {
        ...state,
        currentPatient:action.payload,
        isLoading: false,
        error: false,
      };
    case 'SET_CURRENT_PATIENT_RESET':
      return {
        ...state,
        currentPatient:null,
        isLoading: false,
        error: false,
      };
      
    default:
      return state;
  }
};

export default PatientsReducer;
