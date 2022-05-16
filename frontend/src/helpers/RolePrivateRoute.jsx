import React, { useEffect, useState, useLayoutEffect } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import { userSelector } from '../features/User/userSlice';
import { getToken } from '../helpers/localStorage';
import { fetchUserBytoken } from '../features/User/userActions';
import store from '../app/store';

const RolePrivateRoute = ({ children, roles = [] }) => {
    const [authorized, setAuthorizded] = useState()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function getUserData() {
            const token = getToken().access_token;

            if (token) {
                const user = await store.dispatch(fetchUserBytoken())
                const authorized = roles.includes(user.payload.user_type);
                setAuthorizded(authorized)
            }
            setLoading(false)
        }
        getUserData()
    }, [])
    // If authorized, return an outlet that will render child elements
    // If not, return element that will navigate to login page

    return loading ? (<h1>loading</h1>) : (authorized ? children : <Navigate to='/drops' />);
};

export default RolePrivateRoute;
