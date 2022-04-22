const AuthReducer = (state, action) => {
  switch (action.type) {
    case 'LOAD_REQUEST':
      return {
        ...state,
        isLoading: true,
        error: false,
      };
    case 'LOAD_SUCCESS':
      return {
        user: action.payload,
        isLoading: false,
        error: false,
      };
    case 'LOAD_FAIL':
      return {
        user: null,
        isLoading: false,
        error: action.payload,
      };

    case 'LOGIN_REQUEST':
      return {
        user: null,
        isLoading: true,
        error: false,
      };
    case 'LOGIN_SUCCESS':
      return {
        user: action.payload,
        isLoading: false,
        error: false,
      };
    case 'LOGIN_FAIL':
      return {
        user: null,
        isLoading: false,
        error: action.payload,
      };

    case 'LOGIN_RESET':
      return {
        ...state,
        isLoading: false,
        error: false,
      };
    case 'SIGNUP_SUCCESS':
      return { ...state, isLoading: false, error: false };
    case 'SIGNUP_FAIL':
      return { ...state, isLoading: false, error: action.payload };
    case 'LOGOUT':
      localStorage.removeItem('user');
      return {
        user: JSON.parse(localStorage.getItem('user')) || null,
        isLoading: false,
        error: false,
      };
    default:
      return state;
  }
};

export default AuthReducer;
