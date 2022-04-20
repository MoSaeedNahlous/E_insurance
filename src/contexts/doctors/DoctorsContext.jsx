import { createContext, useReducer } from 'react';
import DoctorsReducer from './DoctorsReducer';

const INITIAL_STATE = {
    doctors: [],
    currentDoctor:null,
    isLoading: false,
  error: false,
  success: false,
    totalFees:''
};

export const DoctorsContext = createContext(INITIAL_STATE);

export const DoctorsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(DoctorsReducer, INITIAL_STATE);

  return (
    <DoctorsContext.Provider
      value={{
        doctors: state.doctors,
        currentDoctor:state.currentDoctor,
        isLoading: state.isLoading,
        error: state.error,
        success: state.success,
        totalFees:state.totalFees,
        dispatch,
      }}
    >
      {children}
    </DoctorsContext.Provider>
  );
};
