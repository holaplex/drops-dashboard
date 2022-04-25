import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  // If authorized, return an outlet that will render child elements
  // If not, return element that will navigate to login page
  return token ? children : <Navigate to='/login' />;
};

export default PrivateRoute;
