import React, { Fragment, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as Loader from 'react-loader-spinner';
import { useNavigate } from 'react-router-dom';
import { userSelector, clearState } from './userSlice';
import { fetchUserBytoken } from './userActions';
import requestHelper from '../../helpers/requestHelper';
import { getToken } from '../../helpers/localStorage';

import Input from '../../components/Input';
import Button from '../../components/Button';

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isFetching, isError } = useSelector(userSelector);
  const { access_token } = getToken();

  useEffect(() => {
    dispatch(fetchUserBytoken());
  }, []);

  const { username, email, userType } = useSelector(userSelector);

  useEffect(() => {
    if (isError) {
      dispatch(clearState());
      navigate('/login');
    }
  }, [isError]);

  const onLogOut = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <div>
      {isFetching ? (
        <Loader.TailSpin color='#00BFFF' height={100} width={100} />
      ) : (
        <Fragment>
          <div>
            <h1>Hello!</h1>
            Welcome back <h3>{username}</h3>{' '}
            userType <h3>{userType}</h3>{' '}
            <span>with token {access_token}</span>
          </div>

          <Button text='Logout' onClick={onLogOut} />
        </Fragment>
      )}
    </div>
  );
};

export default Dashboard;
