// src/components/Login.js
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './Login.css'; // Crearemos este archivo de estilos

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            // AÑADE ESTA LÍNEA PARA DEPURAR
            console.log("Intentando iniciar sesión con:", { username, password });

            await login(username, password);
            navigate('/');
        } catch (err) {
            setError('Credenciales incorrectas. Intente de nuevo.');
        }
    };

    return (
        <div className="login-container">
            <form onSubmit={handleSubmit} className="login-form">
                <h2>Iniciar Sesión de Administrador</h2>
                <input
                    type="text"
                    placeholder="Usuario (admin)"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Contraseña (12345)"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                {error && <p className="error-message">{error}</p>}
                <button type="submit">Ingresar</button>
            </form>
        </div>
    );
};

export default Login;