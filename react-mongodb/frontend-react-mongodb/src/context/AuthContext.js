import { createContext, useState, useContext } from 'react';
import axios from 'axios';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    // Buscamos el token en localStorage al iniciar para mantener la sesión
    const [token, setToken] = useState(localStorage.getItem('token'));

    const login = async (username, password) => {
        try {
            // Hacemos la petición al endpoint de login del backend
            const response = await axios.post('http://localhost:8080/api/auth/login', { username, password });
            const newToken = response.data.token;
            
            // Actualizamos el estado y guardamos el token en localStorage
            setToken(newToken);
            localStorage.setItem('token', newToken);
            
            console.log("Login exitoso, token guardado.");
        } catch (error) {
            console.error("Error en el login:", error);
            // Propagamos el error para que el componente Login pueda mostrar un mensaje
            throw error;
        }
    };

    const logout = () => {
        // Limpiamos el estado y borramos el token de localStorage
        setToken(null);
        localStorage.removeItem('token');
        console.log("Sesión cerrada.");
    };

    // Ponemos el token y las funciones de login/logout a disposición de toda la app
    return (
        <AuthContext.Provider value={{ token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Un "hook" personalizado para acceder fácilmente al contexto desde cualquier componente
export const useAuth = () => useContext(AuthContext);