import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import * as userApi from '../features/User/userApi';
import { userSelector } from '../features/User/userSlice';

const RolePrivateRoute = ({ children, roles = [] }) => {
    const user = useSelector(userSelector)
    const authorized = roles.includes(user.user_type);

    // If authorized, return an outlet that will render child elements
    // If not, return element that will navigate to login page
    return authorized ? children : <Navigate to='/drops' />;
};

export default RolePrivateRoute;
