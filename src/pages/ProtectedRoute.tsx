import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelecetor } from '../store/hooks';

interface IProps {
  children: React.ReactElement;
}

const ProtectedRoute = ({ children }: IProps) => {
  const { user } = useAppSelecetor((state) => state.user);
  if (!user) {
    return <Navigate to="/login" />;
  }
  return children;
};

export default ProtectedRoute;
