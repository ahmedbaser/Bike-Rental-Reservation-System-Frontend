import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

interface PrivateRouteProps {
  children: React.ReactNode;
  isAdmin?: boolean;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children, isAdmin = false }) => {
  const { isAuthenticated, user } = useSelector((state: any) => state.auth);

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (isAdmin && user.role !== 'admin') {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
};

export default PrivateRoute;
