const DoctorsReducer = (state, action) => {
  switch (action.type) {
    case 'GET_DOCTORS_REQUEST':
      return {...state,
        doctors:[],
        isLoading: true,
        error: false,
      };
    case 'GET_DOCTORS_SUCCESS':
      return {
        ...state,
        doctors:action.payload,
        isLoading: false,
        error: false,
      };
    case 'GET_DOCTORS_FAIL':
      return {
        ...state,
        doctors:[],
        isLoading: false,
        error: action.payload,
      };
    
      case 'UPDATE_DOCTOR_REQUEST':
      return {...state,
        isLoading: true,
        error: false,
      };
    case 'UPDATE_DOCTOR_SUCCESS':
      return {
        ...state,
        success:true,
        isLoading: false,
        error: false,
      };
    case 'UPDATE_DOCTOR_FAIL':
      return {
        ...state,
        isLoading: false,
        success:false,
        error: action.payload,
      };
    
    case 'SET_DOCTOR_ACTIVE':
      return {...state,
        isLoading: false,
        error: false,
        doctors: state.doctors.map(doc => {
          if (doc._id === action.payload) {
            doc.isActive = true
          }
          return doc
        })
      };

    case 'SET_DOCTOR_NOT_ACTIVE':
      return {...state,
        isLoading: false,
        error: false,
        doctors: state.doctors.map(doc => {
          if (doc._id === action.payload) {
            doc.isActive = false
          }
          return doc
        })
      };
    
    
    case 'SET_CURRENT_DOCTOR':
      return {...state,
        currentDoctor:action.payload,
        isLoading: false,
        error: false,
      };
    case 'SET_CURRENT_DOCTOR_RESET':
      return {...state,
        currentDoctor:null,
        isLoading: false,
        error: false,
      };
    case 'GET_TOTAL_FEES_REQUEST':
      return {...state,
        totalFees:'',
        isLoading: true,
        error: false,
      };
    case 'GET_TOTAL_FEES_SUCCESS':
      return {...state,
        totalFees:action.payload,
        isLoading: false,
        error: false,
      };
    case 'GET_TOTAL_FEES_FAIL':
      return {...state,
        totalFees:'',
        isLoading: false,
        error: action.payload,
      };
      
    default:
      return state;
  }
};

export default DoctorsReducer;
