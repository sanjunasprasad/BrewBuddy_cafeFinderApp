import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ element }) => {
  const { isAuthenticated } = useAuth();
  const [showMessage, setShowMessage] = useState(false);

  if (isAuthenticated) {
    return element;
  } else {
    if (!showMessage) {
      setShowMessage(true);
      return (
        <div>
          <p>You have to login or signup to access this page.</p>
          <Navigate to="/" />
        </div>
      );
    }
  }

  return <Navigate to="/" />;
};

export default ProtectedRoute;

