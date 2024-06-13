import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
  const refreshToken = localStorage.getItem('refreshToken');
  return refreshToken ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
