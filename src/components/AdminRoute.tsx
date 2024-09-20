import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { RootState } from '../redux/store';

const AdminRoute = ({ children }: { children: React.ReactNode }) => {
  const user = useSelector((state: RootState) => state.auth.user);
  return user?.role === 'admin' ? (
    <>{children}</>
  ) : (
    <Navigate to="/dashboard" />
  );
};

export default AdminRoute;
