import { Alert, CircularProgress } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  doctorRegister,
  pharmacistRegister,
} from '../../contexts/Auth/AuthActions';
import { AuthContext } from '../../contexts/Auth/AuthContext';

const PharmacistReg = () => {
  const navigate = useNavigate();
  const { dispatch, user, isLoading, error } = useContext(AuthContext);
  const [data, setData] = useState({
    name: '',
    phone: '',
    password: '',
    address: '',
  });

  const onChangeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    pharmacistRegister(data, dispatch);
  };

  useEffect(() => {
    dispatch({ type: 'LOGIN_RESET' });
    if (!user || !user.isAdmin) {
      navigate('/', { replace: true });
    }
  }, [user]);

  return (
    <div>
      {error && <Alert severity='error'>{error}</Alert>}
      <form onSubmit={onSubmitHandler}>
        <h2>Create Pharmacist Register</h2>
        <div className='form-group'>
          <input
            type='text'
            onChange={onChangeHandler}
            value={data.name}
            className='form-control'
            name='name'
            aria-describedby='emailHelp'
            placeholder='Enter name'
          />
        </div>

        <div className='form-group'>
          <input
            type='password'
            onChange={onChangeHandler}
            value={data.password}
            className='form-control'
            name='password'
            placeholder='Enter password'
          />
        </div>

        <div className='form-group'>
          <input
            type='text'
            onChange={onChangeHandler}
            value={data.phone}
            className='form-control'
            name='phone'
            placeholder='Enter phone number'
          />
        </div>
        <div className='form-group'>
          <input
            type='text'
            onChange={onChangeHandler}
            value={data.address}
            className='form-control'
            name='address'
            placeholder='Enter address'
          />
        </div>
        <div className='form-group'>
          <button
            type='submit'
            className='btn btn-primary btn-lg'
            disabled={isLoading}
          >
            {isLoading ? <CircularProgress /> : 'Create'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PharmacistReg;
