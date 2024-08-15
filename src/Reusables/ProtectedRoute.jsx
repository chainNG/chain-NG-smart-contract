import React from 'react';
import { useAuthStore } from '../services/store/index';
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
    const { user } = useAuthStore();
    let location = useLocation();

    if (!user) {
        // If no user is logged in, redirect to login page
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    // If user is authenticated, allow access to the route
    return children;
};

export default ProtectedRoute;
