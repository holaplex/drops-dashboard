import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import * as userApi from '../features/User/userApi';
import { userSelector } from '../features/User/userSlice';

const PrivateRoute = ({ children }) => {
    const user = useSelector(userSelector)

    // If authorized, return an outlet that will render child elements
    // If not, return element that will navigate to login page
    return user.user_type === 'admin' ? children : <Navigate to='/drops' />;
};

export default PrivateRoute;
