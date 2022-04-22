const PharmacistsReducer = (state, action) => {
  switch (action.type) {
    case 'GET_PHARMACISTS_REQUEST':
      return {...state,
        pharmacists:[],
        isLoading: true,
        error: false,
      };
    case 'GET_PHARMACISTS_SUCCESS':
      return {
        ...state,
        pharmacists:action.payload,
        isLoading: false,
        error: false,
      };
    case 'GET_PHARMACISTS_FAIL':
      return {
        ...state,
        pharmacists:[],
        isLoading: false,
        error: action.payload,
      };
    case 'GET_DRUGS_REQUEST':
      return {...state,
        drugs:[],
        isLoading: true,
        error: false,
      };
    case 'GET_DRUGS_SUCCESS':
      return {
        ...state,
        drugs:action.payload,
        isLoading: false,
        error: false,
      };
    case 'GET_DRUGS_FAIL':
      return {
        ...state,
        drugs:[],
        isLoading: false,
        error: action.payload,
      };
    
      case 'UPDATE_PHARMACIST_REQUEST':
      return {...state,
        isLoading: true,
        error: false,
      };
    case 'UPDATE_PHARMACIST_SUCCESS':
      return {
        ...state,
        success:true,
        isLoading: false,
        error: false,
      };
    case 'UPDATE_PHARMACIST_FAIL':
      return {
        ...state,
        isLoading: false,
        success:false,
        error: action.payload,
      };
    
    case 'CREATE_PRESCRIPTION_REQUEST':
      return {
        ...state,
        isLoading: true,
        error: false,
      };
    case 'CREATE_PRESCRIPTION_SUCCESS':
      return {
        ...state,
        success:true,
        isLoading: false,
        error: false,
      };
    case 'CREATE_PRESCRIPTION_FAIL':
      return {
        ...state,
        isLoading: false,
        success:false,
        error: action.payload,
      };
    
    case 'SET_PHARMACIST_ACTIVE':
      return {...state,
        isLoading: false,
        error: false,
        pharmacists: state.pharmacists.map(doc => {
          if (doc._id === action.payload) {
            doc.isActive = true
          }
          return doc
        })
      };

    case 'SET_PHARMACIST_NOT_ACTIVE':
      return {...state,
        isLoading: false,
        error: false,
        pharmacists: state.pharmacists.map(doc => {
          if (doc._id === action.payload) {
            doc.isActive = false
          }
          return doc
        })
      };
    
    
    case 'SET_CURRENT_PHARMACIST':
      return {...state,
        currentPharmacist:action.payload,
        isLoading: false,
        error: false,
      };
    case 'SET_CURRENT_PHARMACIST_RESET':
      return {...state,
        currentPharmacist:null,
        isLoading: false,
        error: false,
      };
    case 'GET_TOTAL_PRICE_REQUEST':
      return {...state,
        totalPrice:'',
        isLoading: true,
        error: false,
      };
    case 'GET_TOTAL_PRICE_SUCCESS':
      return {...state,
        totalPrice:action.payload,
        isLoading: false,
        error: false,
      };
    case 'GET_TOTAL_PRICE_FAIL':
      return {...state,
        totalPrice:'',
        isLoading: false,
        error: action.payload,
      };
    case 'RESET':
      return {
        pharmacists: [],
  drugs:[],
  currentPharmacist:null,
  isLoading: false,
  error: false,
  success: false,
  totalPrice:''
      }
      
    default:
      return state;
  }
};

export default PharmacistsReducer;
