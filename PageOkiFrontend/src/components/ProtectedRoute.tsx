import React, {JSX} from 'react';
import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { UserRole } from '../types/roles';

interface ProtectedRouteProps {
    children: JSX.Element;
    allowedRoles: UserRole[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, allowedRoles }) => {
    const { role } = useContext(AuthContext);

    if (role === 'GUEST') {
        return <Navigate to="/login" />;
    }
    if (!allowedRoles.includes(role)) {
        return <Navigate to="/" />;
    }
    return children;
};

export default ProtectedRoute;