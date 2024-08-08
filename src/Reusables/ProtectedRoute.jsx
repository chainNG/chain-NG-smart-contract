import React from 'react'
import { useAuthStore } from '../services/store/index'
import {Navigate, useLocation} from "react-router-dom"

const ProtectedRoute = ({children}) => {
    const {user} = useAuthStore();
    let location = useLocation();
     console.log(location)
    if(user) {
        return <Navigate to="/login" state={{ from: location}} replace />
    }
 return children

};

export default ProtectedRoute;