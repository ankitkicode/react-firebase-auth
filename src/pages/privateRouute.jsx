import React, { useContext } from 'react';
import { AuthContext } from '../context/authContext';
import { Navigate } from 'react-router-dom';

function PrivateRoute({ children }) {
  const { user, loading, error } = useContext(AuthContext);

  if (loading) {
    return <div className="text-center text-2xl h-full w-full flex items-center justify-center text-gray-600">Loading your profile...</div>;
  }

  if (error) {
    // Optionally, handle error state (e.g., show an error message or redirect to an error page)
    return <div>Error: {error}</div>;
  }

  if (user) {
    // Render children if the user is authenticated
    return children;
  }

  // Redirect to login if the user is not authenticated
  return <Navigate to='/login' />;
}

export default PrivateRoute;
