import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate  } from 'react-router-dom';

const AdminRoute = ({children}) => {
  const auth = useSelector((state) => state.auth);

  if (!auth.isAdmin){
    return <Navigate to={'/'}/>;
  }

  return children;
};

export default AdminRoute;

