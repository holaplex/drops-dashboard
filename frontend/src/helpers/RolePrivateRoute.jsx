import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import { userSelector, clearState } from '../features/User/userSlice';
import { getToken } from '../helpers/localStorage';
import { fetchUserBytoken } from '../features/User/userActions';

const RolePrivateRoute = ({ children, roles = [] }) => {
    const [authorized, setAuthorizded] = useState()
    const [loading, setLoading] = useState(true)
    const { user_type, isFetching, isSuccess, isError, errorMessages } =
        useSelector(userSelector);
    const dispatch = useDispatch()

    useEffect(() => {
        if (isSuccess) {
            roles.includes(user_type) ? setAuthorizded(true) : setAuthorizded(false)
            dispatch(clearState());
            setLoading(false)
        }
        if (isError) {
            console.log(errorMessages)
            setLoading(false)
        }
        dispatch(clearState());
    }, [isSuccess, isError, isFetching])

    useEffect(() => {
        const token = getToken().access_token;
        if (token) {
            dispatch(fetchUserBytoken())
        }
        else {
            console.log("NO TOKEN")
        }
    }, [])

    // If authorized, return an outlet that will render child elements
    // If not, return element that will navigate to login page

    return loading ? (<h1>loading</h1>) : (authorized ? children : <Navigate to='/drops' />);
};

export default RolePrivateRoute;
