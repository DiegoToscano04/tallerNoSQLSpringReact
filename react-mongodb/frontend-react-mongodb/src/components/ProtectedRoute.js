import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const { token } = useAuth();

    if (!token) {
        // Si no hay token, redirigir a la página de login
        return <Navigate to="/login" />;
    }

    // Si hay token, mostrar el contenido protegido
    return children;
};

export default ProtectedRoute;