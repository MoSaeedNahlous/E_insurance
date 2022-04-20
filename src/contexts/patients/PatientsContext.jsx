import { createContext, useReducer } from 'react';
import PatientsReducer from './PatientsReducer';

const INITIAL_STATE = {
    patients: [],
    currentPatients:null,
    isLoading: false,
    error: false,
    success: false,
    sum: null,
  searchPharmacists: [],
    searchDoctors:[]
};

export const PatientsContext = createContext(INITIAL_STATE);

export const PatientsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(PatientsReducer, INITIAL_STATE);

  return (
    <PatientsContext.Provider
      value={{
        patients: state.patients,
        currentPatient:state.currentPatient,
        isLoading: state.isLoading,
        error: state.error,
        success: state.success,
        sum: state.sum,
        searchPharmacists: state.searchPharmacists,
        searchDoctors:state.searchDoctors,
        dispatch,
      }}
    >
      {children}
    </PatientsContext.Provider>
  );
};
