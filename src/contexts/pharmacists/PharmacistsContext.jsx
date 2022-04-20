import { createContext, useReducer } from 'react';
import PharmacistsReducer from './PharmacistsReducer';

const INITIAL_STATE = {
  pharmacists: [],
  drugs:[],
  currentPharmacist:null,
  isLoading: false,
  error: false,
  success: false,
  totalPrice:''
};

export const PharmacistsContext = createContext(INITIAL_STATE);

export const PharmacistsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(PharmacistsReducer, INITIAL_STATE);

  return (
    <PharmacistsContext.Provider
      value={{
        pharmacists: state.pharmacists,
        drugs:state.drugs,
        currentPharmacist:state.currentPharmacist,
        isLoading: state.isLoading,
        error: state.error,
        success:state.success,
        dispatch,
        totalPrice:state.totalPrice
      }}
    >
      {children}
    </PharmacistsContext.Provider>
  );
};
